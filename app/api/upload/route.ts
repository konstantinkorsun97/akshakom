import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Декодирование кириллицы из \xXX формата
function decodeCP1251(str: string): string {
  return str.replace(/\\x([0-9a-fA-F]{2})/g, (_, hex) => {
    const code = parseInt(hex, 16)
    if (code >= 0xC0 && code <= 0xFF) {
      return String.fromCharCode(code - 0xC0 + 0x0410)
    }
    if (code === 0xA8) return 'Ё'
    if (code === 0xB8) return 'ё'
    return String.fromCharCode(code)
  })
}

// Парсим название изделия из description_raw
function parseNameDisplay(description: string, proba: number, weightWithStone: number | null, weightWithoutStone: number | null): string {
  const desc = description.toUpperCase().trim()
  const weight = weightWithoutStone || weightWithStone || 0
  const stone = weightWithStone && weightWithStone > 0 ? 'с камнем' : 'без камня'

  let type = 'Изделие'
  if (desc.includes('К-ЦО') || desc.includes('К/ЦО') || desc.includes('КЦО') || desc.includes('К.ЦО') || desc.includes('КОЛЬЦО')) type = 'Кольцо'
  else if (desc.includes('С-ГИ') || desc.includes('С/ГИ') || desc.includes('СЕРЬГИ') || desc.includes('С.ГИ')) type = 'Серьги'
  else if (desc.includes('ЦЕП') || desc.includes('ЦЕПЬ') || desc.includes('ЦЕПОЧ')) type = 'Цепочка'
  else if (desc.includes('БРАСЛ') || desc.includes('БР/ЛЕТ') || desc.includes('БР-ЛЕТ')) type = 'Браслет'
  else if (desc.includes('КУЛОН') || desc.includes('КУЛН')) type = 'Кулон'
  else if (desc.includes('П-КА') || desc.includes('ПОДВ') || desc.includes('ПОД-КА')) type = 'Подвеска'
  else if (desc.includes('КРЕСТ')) type = 'Крест'
  else if (desc.includes('БРОШЬ') || desc.includes('БРОШ')) type = 'Брошь'
  else if (desc.includes('ПЕЧАТКА') || desc.includes('ПЕЧАТ')) type = 'Печатка'

  const probaStr = proba > 0 ? `${proba}°` : ''
  const weightStr = weight > 0 ? `${weight} г` : ''

  const parts = [type]
  if (stone === 'с камнем') parts.push('с камнем')
  if (probaStr) parts.push(probaStr)
  if (weightStr) parts.push(weightStr)

  return parts.join(' · ')
}

// Определяем состояние из description
function parseCondition(description: string): { condition: string, defects: string } {
  const desc = description.toUpperCase()
  const defectList: string[] = []

  if (desc.includes('ДЕФ')) defectList.push('дефект')
  if (desc.includes('ЦАРАП')) defectList.push('царапины')
  if (desc.includes('ГНУТ')) defectList.push('гнутое')
  if (desc.includes('СЛОМ')) defectList.push('сломано')
  if (desc.includes('ЗАГР')) defectList.push('загрязнение')
  if (desc.includes('ОБРЫВ') || desc.includes('ОБР')) defectList.push('обрыв')
  if (desc.includes('ЗАПОН')) defectList.push('запонка')
  if (desc.includes('НЕ РАБ')) defectList.push('не работает')
  if (desc.includes('ВМЯТ')) defectList.push('вмятина')
  if (desc.includes('ПАЯН') || desc.includes('ПАЙ')) defectList.push('пайка')

  const hasDefect = defectList.length > 0
  const condition = hasDefect ? 'Удовлетворительное' : 'Хорошее'
  const defects = defectList.join(', ')

  return { condition, defects }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    const password = formData.get('password') as string

    // Простая защита паролем
    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Неверный пароль' }, { status: 401 })
    }

    // Если только проверка пароля — возвращаем успех
    const checkOnly = formData.get('check_only')
    if (checkOnly === 'true') {
      return NextResponse.json({ success: true })
    }

    if (!file) {
      return NextResponse.json({ error: 'Файл не найден' }, { status: 400 })
    }

    const text = await file.text()
    const lines = text.split('\n').filter(l => l.trim())
    const headers = lines[0].split(';').map(h => h.trim())

    const csvRows = lines.slice(1).map(line => {
      const values = line.split(';')
      const row: Record<string, string> = {}
      headers.forEach((h, i) => {
        row[h] = (values[i] || '').trim()
      })
      return row
    }).filter(row => row.ARTICLE)

    // Получаем все текущие активные товары из Supabase
    const { data: existingProducts } = await supabaseAdmin
      .from('products')
      .select('article, id, estimate_sum, is_active, source_type')

    const existingMap = new Map(existingProducts?.map(p => [p.article, p]) || [])
    const csvArticles = new Set(csvRows.map(r => r.ARTICLE))

    let added = 0, updated = 0, deactivated = 0, errors = 0

    // Обрабатываем каждую строку CSV
    for (const row of csvRows) {
      try {
        const article = row.ARTICLE
        const sourceType = (row.SOURCE_TYPE || 'commission').trim()
        const proba = parseInt(row.PROBA) || 585
        const weightWithStone = row.WEIGHT_WITH_STONE ? parseFloat(row.WEIGHT_WITH_STONE) : null
        const weightWithoutStone = row.WEIGHT_WITHOUT_STONE ? parseFloat(row.WEIGHT_WITHOUT_STONE) : null
        const estimateSum = parseFloat(row.ESTIMATE_SUM) || 0
        const openDate = row.OPEN_DATE ? row.OPEN_DATE.split('.').reverse().join('-') : null
        const descRaw = decodeCP1251(row.DESCRIPTION || '')
        const zalogTypeName = decodeCP1251(row.ZALOG_TYPE_NAME || '')
        const { condition, defects } = parseCondition(descRaw)
        const nameDisplay = parseNameDisplay(descRaw, proba, weightWithStone, weightWithoutStone)

        // Извлекаем zal_bil_id и zalog_number из article (формат: "123456_1")
        const parts = article.split('_')
        const zalBilId = parts[0].replace(/\s/g, '')
        const zalogNumber = parseInt(parts[1]) || 1

        const productData = {
          article,
          zal_bil_id: zalBilId,
          zalog_number: zalogNumber,
          open_date: openDate,
          estimate_sum: estimateSum,
          proba,
          weight_with_stone: weightWithStone,
          weight_without_stone: weightWithoutStone,
          description_raw: descRaw,
          name_display: nameDisplay,
          condition,
          defects: defects || null,
          is_active: true,
          source_type: sourceType,
          updated_at: new Date().toISOString(),
        }

        const existing = existingMap.get(article)

        if (!existing) {
          // Новый товар — добавляем
          await supabaseAdmin.from('products').insert({
            ...productData,
            created_at: new Date().toISOString(),
          })
          added++
        } else {
          // Существующий — обновляем если изменилась цена или статус
          await supabaseAdmin.from('products')
            .update(productData)
            .eq('article', article)
          updated++
        }
      } catch {
        errors++
      }
    }

    // Деактивируем товары которых нет в новом CSV
    const toDeactivate = existingProducts?.filter(p =>
      p.is_active && !csvArticles.has(p.article)
    ) || []

    if (toDeactivate.length > 0) {
      await supabaseAdmin.from('products')
        .update({ is_active: false, updated_at: new Date().toISOString() })
        .in('article', toDeactivate.map(p => p.article))
      deactivated = toDeactivate.length
    }

    return NextResponse.json({
      success: true,
      added,
      updated,
      deactivated,
      errors,
      total: csvRows.length,
    })

  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Ошибка обработки файла' }, { status: 500 })
  }
}
