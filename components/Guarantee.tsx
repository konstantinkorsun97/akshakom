const items = [
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#B8962E" strokeWidth="1.2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Проверка пробы',
    desc: 'Проверяем пробу золота оборудованием перед продажей',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#B8962E" strokeWidth="1.2">
        <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
      </svg>
    ),
    title: 'Честное описание',
    desc: 'Все дефекты указаны в карточке товара с фотографиями',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#B8962E" strokeWidth="1.2">
        <polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
    ),
    title: 'Возврат в 3 дня',
    desc: 'Если состояние не соответствует описанию — вернём деньги',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#B8962E" strokeWidth="1.2">
        <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
    title: 'Доставка по Казахстану',
    desc: 'Самовывоз в Карагандe или доставка по всей стране',
  },
]

export default function Guarantee() {
  return (
    <div style={{background:'#fff', padding:'36px 40px', display:'grid', gridTemplateColumns:'repeat(4, 1fr)', borderTop:'1px solid #E2D9CC', borderBottom:'1px solid #E2D9CC'}}>
      {items.map((item, i) => (
        <div key={i} style={{padding:'16px 24px', borderRight: i < 3 ? '1px solid #E2D9CC' : 'none', textAlign:'center'}}>
          <div style={{display:'flex', justifyContent:'center', marginBottom:'10px'}}>{item.icon}</div>
          <div style={{fontSize:'12px', fontWeight:500, letterSpacing:'1px', textTransform:'uppercase', color:'#1A1612', marginBottom:'4px'}}>{item.title}</div>
          <div style={{fontSize:'12px', color:'#4A4540', fontWeight:300, lineHeight:1.5}}>{item.desc}</div>
        </div>
      ))}
    </div>
  )
}