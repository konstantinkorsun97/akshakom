const products = [
  {
    id: 1,
    icon: '💍',
    probe: '585°',
    category: 'Кольцо · 3.42 г · р.17.5',
    name: 'Обручальное с гравировкой',
    spec: 'Жёлтое золото',
    condition: 'good',
    conditionLabel: 'Хорошее',
    conditionNote: 'Мелкие царапины',
    price: '68 000 ₸',
    oldPrice: '95 000 ₸',
  },
  {
    id: 2,
    icon: '✨',
    probe: '750°',
    category: 'Серьги · 4.18 г',
    name: 'Серьги с бриллиантами',
    spec: 'Белое золото · 0.12 ct',
    condition: 'new',
    conditionLabel: 'Отличное',
    conditionNote: 'Как новые',
    price: '245 000 ₸',
    oldPrice: '',
  },
  {
    id: 3,
    icon: '📿',
    probe: '585°',
    category: 'Цепочка · 7.80 г · 50 см',
    name: 'Цепь плетение «Бисмарк»',
    spec: 'Жёлтое золото',
    condition: 'fair',
    conditionLabel: 'Удовлетворительное',
    conditionNote: 'Погнуто одно звено',
    price: '98 000 ₸',
    oldPrice: '140 000 ₸',
  },
  {
    id: 4,
    icon: '💛',
    probe: '585°',
    category: 'Браслет · 5.25 г · 18 см',
    name: 'Браслет с подвесками',
    spec: 'Жёлтое золото',
    condition: 'new',
    conditionLabel: 'Отличное',
    conditionNote: '',
    price: '115 000 ₸',
    oldPrice: '',
  },
]

const condStyles: Record<string, {bg: string, color: string}> = {
  new:    { bg: '#EAF3DE', color: '#3B6D11' },
  good:   { bg: '#E6F1FB', color: '#185FA5' },
  fair:   { bg: '#FAEEDA', color: '#854F0B' },
  defect: { bg: '#FCEBEB', color: '#A32D2D' },
}

export default function GoldSection() {
  return (
    <section style={{padding:'56px 40px', background:'#F7F4EF'}}>
      
      {/* HEADER */}
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'28px'}}>
        <div>
          <div style={{fontSize:'10px', letterSpacing:'4px', textTransform:'uppercase', color:'#B8962E', fontWeight:400, marginBottom:'6px'}}>Украшения из золота</div>
          <div style={{fontFamily:'"Cormorant Garamond", serif', fontSize:'34px', fontWeight:300, color:'#1A1612', lineHeight:1.1}}>
            Сейчас <em style={{fontStyle:'italic', color:'#4A4540'}}>в продаже</em>
          </div>
        </div>
        <a href="/jewelry" style={{fontSize:'11px', letterSpacing:'2px', textTransform:'uppercase', color:'#4A4540', textDecoration:'none'}}>
          Все украшения →
        </a>
      </div>

      {/* GRID */}
      <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'2px', background:'#E2D9CC'}}>
        {products.map((p) => {
          const cond = condStyles[p.condition]
          return (
            <div key={p.id} style={{background:'#fff', display:'flex', flexDirection:'column'}}>
              
              {/* IMAGE */}
              <div style={{height:'190px', display:'flex', alignItems:'center', justifyContent:'center', background:'#F9F6F0', position:'relative'}}>
                <div style={{fontSize:'48px', opacity:.3}}>{p.icon}</div>
                <div style={{position:'absolute', top:'10px', left:'10px', background:'#B8962E', color:'#fff', fontSize:'9px', letterSpacing:'1.5px', textTransform:'uppercase', padding:'3px 8px', fontWeight:500}}>
                  {p.probe}
                </div>
              </div>

              {/* INFO */}
              <div style={{padding:'14px 16px 8px', flex:1}}>
                <div style={{fontSize:'10px', letterSpacing:'2px', textTransform:'uppercase', color:'#B8962E', marginBottom:'4px', fontWeight:400}}>{p.category}</div>
                <div style={{fontFamily:'"Cormorant Garamond", serif', fontSize:'17px', fontWeight:400, color:'#1A1612', marginBottom:'3px', lineHeight:1.2}}>{p.name}</div>
                <div style={{fontSize:'11px', color:'#4A4540', fontWeight:300, marginBottom:'9px'}}>{p.spec}</div>
                
                {/* CONDITION */}
                <div style={{display:'flex', alignItems:'center', gap:'8px', marginBottom:'8px', flexWrap:'wrap'}}>
                  <span style={{display:'inline-flex', alignItems:'center', gap:'4px', fontSize:'9px', letterSpacing:'1.5px', textTransform:'uppercase', fontWeight:500, padding:'3px 7px', background:cond.bg, color:cond.color}}>
                    <span style={{width:'5px', height:'5px', borderRadius:'50%', background:cond.color, flexShrink:0, display:'inline-block'}}></span>
                    {p.conditionLabel}
                  </span>
                  {p.conditionNote && (
                    <span style={{fontSize:'10px', color:cond.color, fontWeight:300}}>{p.conditionNote}</span>
                  )}
                </div>

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
