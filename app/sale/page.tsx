import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function SalePage() {
  return (
    <>
      <Header />
      <div style={{background:'#F7F4EF', minHeight:'80vh'}}>
        <div style={{background:'#1A1612', padding:'64px 80px'}}>
          <div style={{fontSize:'10px', letterSpacing:'4px', textTransform:'uppercase', color:'#B8962E', marginBottom:'16px', fontWeight:400}}>Акции и скидки</div>
          <h1 style={{fontFamily:'"Cormorant Garamond", serif', fontSize:'48px', fontWeight:300, color:'#fff', margin:0}}>
            Специальные <em style={{fontStyle:'italic', color:'#D4AF57'}}>предложения</em>
          </h1>
        </div>
        <div style={{padding:'80px', textAlign:'center', maxWidth:'680px', margin:'0 auto'}}>
          <div style={{width:'64px', height:'64px', border:'1px solid #E2D9CC', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 32px', fontSize:'24px'}}>
            🏷
          </div>
          <div style={{fontFamily:'"Cormorant Garamond", serif', fontSize:'32px', fontWeight:300, color:'#1A1612', marginBottom:'20px', lineHeight:1.3}}>
            Здесь будут публиковаться<br/>наши сезонные акции
          </div>
          <p style={{fontSize:'14px', color:'#4A4540', fontWeight:300, lineHeight:1.8, marginBottom:'40px'}}>
            Следите за нашими обновлениями и новостями. Мы регулярно проводим сезонные распродажи, акции на отдельные категории товаров и специальные предложения для постоянных покупателей.
          </p>
          <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1px', background:'#E2D9CC', marginBottom:'48px'}}>
            {[
              {title:'Сезонные скидки', desc:'Специальные цены на украшения в конце каждого сезона'},
              {title:'Акции на категории', desc:'Скидки на отдельные типы украшений и техники'},
              {title:'Постоянным клиентам', desc:'Особые условия для тех, кто покупает у нас регулярно'},
            ].map(item => (
              <div key={item.title} style={{background:'#fff', padding:'32px 24px', textAlign:'left'}}>
                <div style={{width:'32px', height:'2px', background:'#B8962E', marginBottom:'16px'}}></div>
                <div style={{fontSize:'13px', fontWeight:500, letterSpacing:'1px', textTransform:'uppercase', color:'#1A1612', marginBottom:'10px'}}>{item.title}</div>
                <div style={{fontSize:'13px', color:'#4A4540', fontWeight:300, lineHeight:1.6}}>{item.desc}</div>
              </div>
            ))}
          </div>
          <div style={{padding:'20px 32px', background:'#F0EDE8', border:'1px solid #E2D9CC', fontSize:'13px', color:'#4A4540', fontWeight:300}}>
            Подпишитесь на наш{' '}
            <span style={{color:'#B8962E', fontWeight:400}}>Instagram</span> и{' '}
            <span style={{color:'#B8962E', fontWeight:400}}>WhatsApp</span>{' '}
            чтобы первыми узнавать об акциях
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}