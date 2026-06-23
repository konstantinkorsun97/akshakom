export default function MaintenancePage() {
  return (
    <html lang="ru">
      <head>
        <title>Техническое обслуживание — АкшаКом</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Jost:wght@300;400&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, background: '#F7F4EF', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Jost", sans-serif' }}>
        <div style={{ textAlign: 'center', padding: '40px 24px', maxWidth: '480px' }}>

          {/* Лого */}
          <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '32px', fontWeight: 600, letterSpacing: '4px', color: '#1A1612', marginBottom: '4px' }}>
            АКША<span style={{ color: '#B8962E' }}>КОМ</span>
          </div>
          <div style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: '#888', marginBottom: '48px' }}>
            Комиссионный магазин
          </div>

          {/* Иконка */}
          <div style={{ marginBottom: '32px' }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#B8962E" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
          </div>

          {/* Заголовок */}
          <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '28px', fontWeight: 300, color: '#1A1612', marginBottom: '16px', lineHeight: 1.3 }}>
            Сайт на техническом<br />
            <em style={{ fontStyle: 'italic', color: '#B8962E' }}>обслуживании</em>
          </div>

          <p style={{ fontSize: '14px', color: '#666', fontWeight: 300, lineHeight: 1.8 }}>
            Приносим извинения за неудобства.<br />
            Совсем скоро сайт снова заработает.
          </p>

        </div>
      </body>
    </html>
  )
}
