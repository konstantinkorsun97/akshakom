export default function TechSection() {
  return (
    <section style={{padding:'48px 40px 56px', background:'#F7F4EF'}}>
      <div style={{height:'1px', background:'#E2D9CC', marginBottom:'48px'}}></div>

      <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'28px'}}>
        <div>
          <div style={{fontSize:'10px', letterSpacing:'4px', textTransform:'uppercase', color:'#B8962E', fontWeight:400, marginBottom:'6px'}}>Электронная техника</div>
          <div style={{fontFamily:'"Cormorant Garamond", serif', fontSize:'34px', fontWeight:300, color:'#1A1612', lineHeight:1.1}}>
            Скоро <em style={{fontStyle:'italic', color:'#4A4540'}}>в продаже</em>
          </div>
        </div>
      </div>

      <div style={{background:'#1A1612', padding:'64px 48px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'64px', alignItems:'center'}}>
        <div>
          <div style={{fontSize:'10px', letterSpacing:'4px', textTransform:'uppercase', color:'#B8962E', marginBottom:'20px', fontWeight:400}}>Раздел в разработке</div>
          <div style={{fontFamily:'"Cormorant Garamond", serif', fontSize:'40px', fontWeight:300, color:'#fff', lineHeight:1.2, marginBottom:'20px'}}>
            Смартфоны, ноутбуки<br/>и <em style={{fontStyle:'italic', color:'#D4AF57'}}>аксессуары</em>
          </div>
          <p style={{fontSize:'13px', color:'#888', fontWeight:300, lineHeight:1.8, marginBottom:'32px', maxWidth:'400px'}}>
            Совсем скоро в нашем комиссионном магазине появится раздел электронной техники. Смартфоны, ноутбуки, планшеты, умные часы и аксессуары — всё с честным описанием состояния и по выгодным ценам.
          </p>
          <div style={{display:'flex', gap:'32px', marginBottom:'40px'}}>
            {[
              { icon: '📱', label: 'Смартфоны' },
              { icon: '💻', label: 'Ноутбуки' },
              { icon: '⌚', label: 'Умные часы' },
              { icon: '🎧', label: 'Аксессуары' },
            ].map(item => (
              <div key={item.label} style={{textAlign:'center'}}>
                <div style={{fontSize:'28px', marginBottom:'8px', opacity:.5}}>{item.icon}</div>
                <div style={{fontSize:'10px', letterSpacing:'2px', textTransform:'uppercase', color:'#555', fontWeight:300}}>{item.label}</div>
              </div>
            ))}
          </div>
          <div style={{display:'flex', alignItems:'center', gap:'16px'}}>
            <div style={{width:'40px', height:'1px', background:'#B8962E'}}></div>
            <span style={{fontSize:'12px', color:'#666', fontWeight:300, letterSpacing:'1px'}}>Следите за обновлениями</span>
          </div>
        </div>

        <div style={{display:'flex', flexDirection:'column', gap:'16px'}}>
          {[
            { title: 'Честное описание', desc: 'Все дефекты и особенности техники будут подробно описаны' },
            { title: 'Проверенные устройства', desc: 'Каждое устройство проходит проверку перед размещением' },
            { title: 'Выгодные цены', desc: 'Комиссионные цены — значительно ниже рыночных' },
            { title: 'Рассрочка Kaspi', desc: 'Возможность покупки в рассрочку через Kaspi банк' },
          ].map(item => (
            <div key={item.title} style={{padding:'16px 20px', border:'1px solid #2A2520', display:'flex', gap:'16px', alignItems:'flex-start'}}>
              <div style={{width:'6px', height:'6px', borderRadius:'50%', background:'#B8962E', flexShrink:0, marginTop:'5px'}}></div>
              <div>
                <div style={{fontSize:'12px', fontWeight:500, letterSpacing:'1px', textTransform:'uppercase', color:'#ccc', marginBottom:'4px'}}>{item.title}</div>
                <div style={{fontSize:'12px', color:'#666', fontWeight:300, lineHeight:1.5}}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}