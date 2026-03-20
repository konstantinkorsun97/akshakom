'use client'

export default function Header() {
  return (
    <>
      {/* TOP BAR */}
      <div style={{background:'#1A1612', padding:'8px 40px', display:'flex', justifyContent:'space-between'}}>
        <span style={{fontSize:'11px', color:'#666', fontWeight:300, letterSpacing:'1px'}}>
          Комиссионный магазин · Карагандa, Казахстан
        </span>
        <span style={{fontSize:'11px', color:'#D4AF57', fontWeight:300, letterSpacing:'1px'}}>
          +7 (7212) 00-00-00 · WhatsApp · Instagram
        </span>
      </div>

      {/* HEADER */}
      <header style={{background:'#fff', borderBottom:'1px solid #E2D9CC', position:'sticky', top:0, zIndex:100}}>
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 40px', height:'68px'}}>
          
          {/* LOGO */}
          <a href="/" style={{fontFamily:'"Cormorant Garamond", serif', fontSize:'26px', fontWeight:600, letterSpacing:'3px', color:'#1A1612', textDecoration:'none', display:'flex', flexDirection:'column', lineHeight:1}}>
            АКША<span style={{color:'#B8962E'}}>КОМ</span>
            <span style={{fontSize:'9px', letterSpacing:'4px', textTransform:'uppercase', color:'#4A4540', fontFamily:'"Jost", sans-serif', fontWeight:300, marginTop:'3px'}}>
              Комиссионный магазин
            </span>
          </a>

          {/* SEARCH */}
          <div style={{flex:1, maxWidth:'400px', margin:'0 40px', position:'relative'}}>
            <svg style={{position:'absolute', left:'12px', top:'50%', transform:'translateY(-50%)', width:'15px', height:'15px', stroke:'#4A4540', fill:'none', strokeWidth:1.5}} viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input type="text" placeholder="Поиск: кольцо 585, iPhone 14..." style={{width:'100%', padding:'9px 16px 9px 38px', border:'1px solid #E2D9CC', background:'#F7F4EF', fontSize:'13px', fontFamily:'"Jost", sans-serif', fontWeight:300, color:'#1A1612', outline:'none'}} />
          </div>

          {/* ICONS */}
          <div style={{display:'flex', gap:'24px', alignItems:'center'}}>
            <button style={{background:'none', border:'none', cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center', gap:'3px', color:'#4A4540', fontSize:'11px', fontFamily:'"Jost", sans-serif', fontWeight:300, letterSpacing:'1px'}}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
              Войти
            </button>
            <button style={{background:'none', border:'none', cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center', gap:'3px', color:'#4A4540', fontSize:'11px', fontFamily:'"Jost", sans-serif', fontWeight:300, letterSpacing:'1px'}}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              Избранное
            </button>
            <button style={{background:'none', border:'none', cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center', gap:'3px', color:'#4A4540', fontSize:'11px', fontFamily:'"Jost", sans-serif', fontWeight:300, letterSpacing:'1px', position:'relative'}}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              Корзина
              <span style={{position:'absolute', top:'-4px', right:'-4px', background:'#B8962E', color:'#fff', fontSize:'9px', width:'16px', height:'16px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:500}}>0</span>
            </button>
          </div>
        </div>

        {/* NAV */}
        <nav style={{borderTop:'1px solid #E2D9CC', display:'flex', justifyContent:'center'}}>
          {[
            {label:'Главная', href:'/'},
            {label:'Украшения из золота', href:'/jewelry'},
            {label:'Техника', href:'/tech'},
            {label:'Новые поступления', href:'/new'},
            {label:'Акции', href:'/sale'},
            {label:'Как это работает', href:'/how'},
            {label:'Сдать на комиссию', href:'/consign'},
          ].map((item) => (
            <a key={item.href} href={item.href} style={{display:'block', padding:'13px 20px', fontSize:'11px', fontWeight:400, letterSpacing:'2px', textTransform:'uppercase', textDecoration:'none', color:'#4A4540', borderBottom:'2px solid transparent', transition:'all .2s', whiteSpace:'nowrap'}}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>
    </>
  )
}