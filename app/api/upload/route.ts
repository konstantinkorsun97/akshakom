import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { password, action, products, articles } = body

    // Проверка пароля
    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Неверный пароль' }, { status: 401 })
    }

    // Только проверка пароля
    if (action === 'check_password') {
      return NextResponse.json({ success: true })
    }

    // Батч upsert товаров
    if (action === 'upsert' && products?.length > 0) {
      const { error } = await supabaseAdmin
        .from('products')
        .upsert(products, { onConflict: 'article' })
      if (error) throw error
      return NextResponse.json({ success: true, count: products.length })
    }

    // Деактивация удалённых товаров
    if (action === 'deactivate' && articles?.length > 0) {
      const { error } = await supabaseAdmin
        .from('products')
        .update({ is_active: false, updated_at: new Date().toISOString() })
        .in('article', articles)
      if (error) throw error
      return NextResponse.json({ success: true, count: articles.length })
    }

    // Получить все активные артикулы из БД
    if (action === 'get_articles') {
      const { data, error } = await supabaseAdmin
        .from('products')
        .select('article')
        .eq('is_active', true)
      if (error) throw error
      return NextResponse.json({ articles: data?.map(p => p.article) || [] })
    }

    return NextResponse.json({ error: 'Неизвестное действие' }, { status: 400 })

  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ error: err.message || 'Ошибка сервера' }, { status: 500 })
  }
}
