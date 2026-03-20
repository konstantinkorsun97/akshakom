export default function Hero() {
  return (
    <section style={{background:'#1A1612', display:'grid', gridTemplateColumns:'1fr 1fr', minHeight:'380px'}}>
      
      {/* LEFT */}
      <div style={{padding:'56px 80px', display:'flex', flexDirection:'column', justifyContent:'center'}}>
        <div style={{display:'inline-flex', alignItems:'center', gap:'10px', marginBottom:'22px'}}>
          <div style={{width:'28px', height:'1px', background:'#B8962E'}}></div>
          <span style={{fontSize:'10px', letterSpacing:'4px', textTransform:'uppercase', color:'#B8962E', fontWeight:400}}>Комиссионный магазин</span>
        </div>

        <h1 style={{fontFamily:'"Cormorant Garamond", serif', fontSize:'46px', fontWeight:300, color:'#fff', lineHeight:1.15, marginBottom:'16px'}}>
          Золото и техника<br/>по <em style={{fontStyle:'italic', color:'#D4AF57'}}>честной</em> цене
        </h1>

        <p style={{fontSize:'13px', fontWeight:300, color:'#888', lineHeight:1.8, maxWidth:'340px', marginBottom:'32px'}}>
          Комиссионные изделия из золота и техника с подробным описанием состояния. Каждый дефект — на виду.
        </p>

        <div style={{display:'flex', gap:'28px'}}>
          <div>
            <div style={{fontFamily:'"Cormorant Garamond", serif', fontSize:'28px', fontWeight:400, color:'#fff'}}>
              500<sup style={{color:'#B8962E', fontSize:'16px'}}>+</sup>
            </div>
            <div style={{fontSize:'10px', letterSpacing:'1.5px', textTransform:'uppercase', color:'#555', fontWeight:300, marginTop:'1px'}}>Товаров в наличии</div>
          </div>
          <div>
            <div style={{fontFamily:'"Cormorant Garamond", serif', fontSize:'28px', fontWeight:400, color:'#fff'}}>
              40<sup style={{color:'#B8962E', fontSize:'16px'}}>%</sup>
            </div>
            <div style={{fontSize:'10px', letterSpacing:'1.5px', textTransform:'uppercase', color:'#555', fontWeight:300, marginTop:'1px'}}>Дешевле рынка</div>
          </div>
          <div>
            <div style={{fontFamily:'"Cormorant Garamond", serif', fontSize:'28px', fontWeight:400, color:'#fff'}}>
              100<sup style={{color:'#B8962E', fontSize:'16px'}}>%</sup>
            </div>
            <div style={{fontSize:'10px', letterSpacing:'1.5px', textTransform:'uppercase', color:'#555', fontWeight:300, marginTop:'1px'}}>Честное описание</div>
          </div>
        </div>
      </div>

      {/* RIGHT — две категории */}
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', borderLeft:'1px solid #2A2520'}}>
        <a href="/jewelry" style={{display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'36px 40px', cursor:'pointer', textDecoration:'none', borderRight:'1px solid #2A2520', position:'relative', overflow:'hidden', transition:'background .25s'}}>
          <div style={{fontSize:'48px', opacity:.2, position:'absolute', top:'28px', right:'28px'}}>💍</div>
          <div style={{fontSize:'10px', letterSpacing:'3px', color:'#444', fontWeight:300, marginBottom:'8px'}}>01</div>
          <div style={{fontFamily:'"Cormorant Garamond", serif', fontSize:'26px', fontWeight:400, color:'#fff', marginBottom:'6px'}}>Украшения<br/>из золота</div>
          <div style={{fontSize:'11px', color:'#B8962E', letterSpacing:'1px', fontWeight:300}}>147 изделий в наличии</div>
          <div style={{position:'absolute', bottom:'28px', right:'28px', color:'#333', fontSize:'18px'}}>↗</div>
        </a>

        <a href="/tech" style={{display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'36px 40px', cursor:'pointer', textDecoration:'none', position:'relative', overflow:'hidden', transition:'background .25s'}}>
          <div style={{fontSize:'48px', opacity:.2, position:'absolute', top:'28px', right:'28px'}}>📱</div>
          <div style={{fontSize:'10px', letterSpacing:'3px', color:'#444', fontWeight:300, marginBottom:'8px'}}>02</div>
          <div style={{fontFamily:'"Cormorant Garamond", serif', fontSize:'26px', fontWeight:400, color:'#fff', marginBottom:'6px'}}>Электронная<br/>техника</div>
          <div style={{fontSize:'11px', color:'#B8962E', letterSpacing:'1px', fontWeight:300}}>83 товара в наличии</div>
          <div style={{position:'absolute', bottom:'28px', right:'28px', color:'#333', fontSize:'18px'}}>↗</div>
        </a>
      </div>

    </section>
  )
}
