export default function Footer() {
  return (
    <footer style={{background:'#111', padding:'48px 40px 24px'}}>
      <div style={{display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', gap:'48px', marginBottom:'40px'}}>
        
        <div>
          <div style={{fontFamily:'"Cormorant Garamond", serif', fontSize:'22px', fontWeight:600, letterSpacing:'3px', color:'#fff', marginBottom:'2px'}}>
            АКША<span style={{color:'#B8962E'}}>КОМ</span>
          </div>
          <div style={{fontSize:'9px', letterSpacing:'3px', textTransform:'uppercase', color:'#333', fontFamily:'"Jost", sans-serif', fontWeight:300, marginBottom:'14px'}}>Комиссионный магазин</div>
          <div style={{fontSize:'13px', color:'#444', fontWeight:300, lineHeight:1.7, maxWidth:'240px'}}>
            Золотые украшения и электроника с честным описанием состояния. Карагандa, Казахстан.
          </div>
        </div>

        <div>
          <div style={{fontSize:'10px', letterSpacing:'3px', textTransform:'uppercase', color:'#B8962E', marginBottom:'12px', fontWeight:400}}>Покупателям</div>
          {['Как купить', 'Состояние товаров', 'Доставка и оплата', 'Возврат товара', 'Рассрочка Kaspi'].map((link) => (
            <div key={link} style={{marginBottom:'8px'}}>
              <a href="#" style={{fontSize:'13px', color:'#555', textDecoration:'none', fontWeight:300}}>{link}</a>
            </div>
          ))}
        </div>

        <div>
          <div style={{fontSize:'10px', letterSpacing:'3px', textTransform:'uppercase', color:'#B8962E', marginBottom:'12px', fontWeight:400}}>Продавцам</div>
          {['Сдать на комиссию', 'Условия комиссии', 'Оценка изделий', 'Пробы золота'].map((link) => (
            <div key={link} style={{marginBottom:'8px'}}>
              <a href="#" style={{fontSize:'13px', color:'#555', textDecoration:'none', fontWeight:300}}>{link}</a>
            </div>
          ))}
        </div>

        <div>
          <div style={{fontSize:'10px', letterSpacing:'3px', textTransform:'uppercase', color:'#B8962E', marginBottom:'12px', fontWeight:400}}>Контакты</div>
          {['+7 (7212) 00-00-00', 'WhatsApp', 'Instagram', 'г. Карагандa'].map((link) => (
            <div key={link} style={{marginBottom:'8px'}}>
              <a href="#" style={{fontSize:'13px', color:'#555', textDecoration:'none', fontWeight:300}}>{link}</a>
            </div>
          ))}
        </div>

      </div>

      <div style={{borderTop:'1px solid #1A1A1A', paddingTop:'20px', display:'flex', justifyContent:'space-between'}}>
        <div style={{fontSize:'11px', color:'#2A2A2A', fontWeight:300}}>© 2025 АкшаКом · Комиссионный магазин · Карагандa</div>
        <div style={{fontSize:'11px', color:'#222', fontWeight:300, letterSpacing:'1px'}}>Золото 375° · 500° · 585° · 750° · 999°</div>
      </div>
    </footer>
  )
}