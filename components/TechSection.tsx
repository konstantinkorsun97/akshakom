const products = [
  {
    id: 1,
    icon: '📱',
    category: 'Смартфон',
    name: 'iPhone 14 Pro 256GB',
    spec: 'Deep Purple · iOS 17',
    condition: 'defect',
    conditionLabel: 'Дефект',
    conditionNote: 'Face ID не работает',
    price: '189 000 ₸',
    oldPrice: '320 000 ₸',
    badge: 'Акция',
  },
  {
    id: 2,
    icon: '💻',
    category: 'Ноутбук',
    name: 'MacBook Air M2 13"',
    spec: '8GB / 256GB · Space Gray',
    condition: 'fair',
    conditionLabel: 'Удовлетворительное',
    conditionNote: 'Трещина на корпусе',
    price: '298 000 ₸',
    oldPrice: '480 000 ₸',
    badge: '',
  },
  {
    id: 3,
    icon: '⌚',
    category: 'Смарт-часы',
    name: 'Apple Watch Series 8',
    spec: '45mm · Midnight · GPS',
    condition: 'good',
    conditionLabel: 'Хорошее',
    conditionNote: 'Царапины на экране',
    price: '128 000 ₸',
    oldPrice: '185 000 ₸',
    badge: '',
  },
  {
    id: 4,
    icon: '🎧',
    category: 'Наушники',
    name: 'AirPods Pro 2-го поколения',
    spec: 'MagSafe · Lightning',
    condition: 'new',
    conditionLabel: 'Отличное',
    conditionNote: 'Как новые',
    price: '89 000 ₸',
    oldPrice: '115 000 ₸',
    badge: '',
  },
]

const condStyles: Record<string, {bg: string, color: string}> = {
  new:    { bg: '#EAF3DE', color: '#3B6D11' },
  good:   { bg: '#E6F1FB', color: '#185FA5' },
  fair:   { bg: '#FAEEDA', color: '#854F0B' },
  defect: { bg: '#FCEBEB', color: '#A32D2D' },
}

export default function TechSection() {
  return (
    <section style={{padding:'48px 40px 56px', background:'#F7F4EF'}}>

      {/* DIVIDER */}
      <div style={{height:'1px', background:'#E2D9CC', marginBottom:'48px'}}></div>

      {/* HEADER */}
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'28px'}}>
        <div>
          <div style={{fontSize:'10px', letterSpacing:'4px', textTransform:'uppercase', color:'#B8962E', fontWeight:400, marginBottom:'6px'}}>Электронная техника</div>
          <div style={{fontFamily:'"Cormorant Garamond", serif', fontSize:'34px', fontWeight:300, color:'#1A1612', lineHeight:1.1}}>
            Сейчас <em style={{fontStyle:'italic', color:'#4A4540'}}>в продаже</em>
          </div>
        </div>
        <a href="/tech" style={{fontSize:'11px', letterSpacing:'2px', textTransform:'uppercase', color:'#4A4540', textDecoration:'none'}}>
          Вся техника →
        </a>
      </div>

      {/* GRID */}
      <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'2px', background:'#E2D9CC'}}>
        {products.map((p) => {
          const cond = condStyles[p.condition]
          return (
            <div key={p.id} style={{background:'#fff', display:'flex', flexDirection:'column'}}>

              {/* IMAGE */}
              <div style={{height:'190px', display:'flex', alignItems:'center', justifyContent:'center', background:'#F0F3F7', position:'relative'}}>
                <div style={{fontSize:'48px', opacity:.3}}>{p.icon}</div>
                {p.badge && (
                  <div style={{position:'absolute', top:'10px', left:'10px', background:'#E24B4A', color:'#fff', fontSize:'9px', letterSpacing:'1.5px', textTransform:'uppercase', padding:'3px 8px', fontWeight:500}}>
                    {p.badge}
                  </div>
                )}
              </div>

              {/* INFO */}
              <div style={{padding:'14px 16px 8px', flex:1}}>
                <div style={{fontSize:'10px', letterSpacing:'2px', textTransform:'uppercase', color:'#B8962E', marginBottom:'4px', fontWeight:400}}>{p.category}</div>
                <div style={{fontFamily:'"Cormorant Garamond", serif', fontSize:'17px', fontWeight:400, color:'#1A1612', marginBottom:'3px', lineHeight:1.2}}>{p.name}</div>
                <div style={{fontSize:'11px', color:'#4A4540', fontWeight:300, marginBottom:'9px'}}>{p.spec}</div>

                {/* CONDITION */}
                <div style={{display:'flex', alignItems:'center', gap:'8px', marginBottom:'6px', flexWrap:'wrap'}}>
                  <span style={{display:'inline-flex', alignItems:'center', gap:'4px', fontSize:'9px', letterSpacing:'1.5px', textTransform:'uppercase', fontWeight:500, padding:'3px 7px', background:cond.bg, color:cond.color}}>
                    <span style={{width:'5px', height:'5px', borderRadius:'50%', background:cond.color, flexShrink:0, display:'inline-block'}}></span>
                    {p.conditionLabel}
                  </span>
                </div>
                {p.conditionNote && (
                  <div style={{fontSize:'10px', color:cond.color, fontWeight:300, marginBottom:'8px'}}>{p.conditionNote}</div>
                )}

                {/* PRICE */}
                <div>
                  <span style={{fontSize:'16px', fontWeight:500, color:'#1A1612'}}>{p.price}</span>
                  {p.oldPrice && <span style={{fontSize:'11px', color:'#B0A898', textDecoration:'line-through', marginLeft:'6px', fontWeight:300}}>{p.oldPrice}</span>}
                </div>
              </div>

              {/* FOOTER */}
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'9px 16px 12px', borderTop:'1px solid #E2D9CC', marginTop:'auto'}}>
                <button style={{background:'none', border:'none', cursor:'pointer', color:'#4A4540', fontSize:'10px', letterSpacing:'1px', textTransform:'uppercase', display:'flex', alignItems:'center', gap:'5px', fontFamily:'"Jost", sans-serif'}}>
                  ♡ В избранное
                </button>
                <button style={{background:'#1A1612', color:'#fff', border:'none', cursor:'pointer', fontSize:'9px', letterSpacing:'2px', textTransform:'uppercase', padding:'7px 14px', fontFamily:'"Jost", sans-serif'}}>
                  В корзину
                </button>
              </div>

            </div>
          )
        })}
      </div>

    </section>
  )
}
