'use client'
import { useState } from 'react'

export default function AdminUploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{
    success?: boolean
    added?: number
    updated?: number
    deactivated?: number
    errors?: number
    total?: number
    error?: string
  } | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!file || !password) return

    setLoading(true)
    setResult(null)

    const formData = new FormData()
    formData.append('file', file)
    formData.append('password', password)

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      setResult(data)
    } catch {
      setResult({ error: 'Ошибка соединения с сервером' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ background: '#F7F4EF', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <div style={{ background: '#fff', border: '1px solid #E2D9CC', padding: '40px', maxWidth: '520px', width: '100%' }}>

        {/* ЗАГОЛОВОК */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '28px', fontWeight: 300, color: '#1A1612', marginBottom: '6px' }}>
            АКША<span style={{ color: '#B8962E' }}>КОМ</span>
          </div>
          <div style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: '#888' }}>
            Обновление каталога
          </div>
        </div>

        <form onSubmit={handleSubmit}>

          {/* ПАРОЛЬ */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: '#B8962E', marginBottom: '8px' }}>
              Пароль
            </div>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Введите пароль"
              required
              style={{ width: '100%', padding: '10px 14px', border: '1px solid #E2D9CC', background: '#F7F4EF', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          {/* ФАЙЛ */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: '#B8962E', marginBottom: '8px' }}>
              CSV файл из IBExpert
            </div>
            <input
              type="file"
              accept=".csv"
              onChange={e => setFile(e.target.files?.[0] || null)}
              required
              style={{ width: '100%', padding: '10px 14px', border: '1px solid #E2D9CC', background: '#F7F4EF', fontSize: '13px', boxSizing: 'border-box', cursor: 'pointer' }}
            />
            {file && (
              <div style={{ marginTop: '6px', fontSize: '12px', color: '#B8962E' }}>
                ✓ {file.name} ({(file.size / 1024).toFixed(0)} KB)
              </div>
            )}
          </div>

          {/* КНОПКА */}
          <button
            type="submit"
            disabled={loading || !file || !password}
            style={{
              width: '100%', padding: '14px',
              background: loading ? '#888' : '#1A1612',
              color: '#fff', border: 'none',
              fontSize: '11px', letterSpacing: '3px',
              textTransform: 'uppercase',
              cursor: loading ? 'default' : 'pointer',
              fontFamily: '"Jost", sans-serif',
            }}>
            {loading ? 'Обновляется...' : 'Загрузить и обновить'}
          </button>
        </form>

        {/* РЕЗУЛЬТАТ */}
        {result && (
          <div style={{
            marginTop: '24px', padding: '20px',
            background: result.error ? '#FFF0F0' : '#F0FFF0',
            border: `1px solid ${result.error ? '#FFB0B0' : '#B0FFB0'}`,
          }}>
            {result.error ? (
              <div style={{ color: '#C0392B', fontSize: '13px' }}>
                ❌ {result.error}
              </div>
            ) : (
              <div>
                <div style={{ fontSize: '13px', fontWeight: 500, color: '#1A1612', marginBottom: '12px' }}>
                  ✅ Каталог обновлён успешно!
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {[
                    { label: 'Всего в файле', value: result.total, color: '#1A1612' },
                    { label: 'Добавлено новых', value: result.added, color: '#27AE60' },
                    { label: 'Обновлено', value: result.updated, color: '#2980B9' },
                    { label: 'Снято с продажи', value: result.deactivated, color: '#E67E22' },
                  ].map(item => (
                    <div key={item.label} style={{ padding: '10px', background: '#fff', border: '1px solid #E2D9CC', textAlign: 'center' }}>
                      <div style={{ fontSize: '22px', fontWeight: 600, color: item.color }}>{item.value}</div>
                      <div style={{ fontSize: '10px', color: '#888', letterSpacing: '1px', textTransform: 'uppercase', marginTop: '2px' }}>{item.label}</div>
                    </div>
                  ))}
                </div>
                {(result.errors || 0) > 0 && (
                  <div style={{ marginTop: '10px', fontSize: '12px', color: '#E67E22' }}>
                    ⚠ Ошибок при обработке: {result.errors}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ИНСТРУКЦИЯ */}
        <div style={{ marginTop: '24px', padding: '16px', background: '#F7F4EF', border: '1px solid #E2D9CC', fontSize: '12px', color: '#888', lineHeight: 1.7 }}>
          <div style={{ fontWeight: 500, color: '#4A4540', marginBottom: '6px' }}>Инструкция:</div>
          1. Откройте IBExpert и запустите SQL запрос<br />
          2. Экспортируйте результат в CSV (разделитель — точка с запятой)<br />
          3. Загрузите файл выше и нажмите кнопку<br />
          4. Дождитесь результата — сайт обновится автоматически
        </div>
      </div>
    </div>
  )
}
