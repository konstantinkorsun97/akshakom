import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function TechPage() {
  return (
    <>
      <Header />
      <div style={{background:'#1A1612', minHeight:'80vh', display:'flex', alignItems:'center', justifyContent:'center'}}>
        <div style={{textAlign:'center', padding:'80px 40px', maxWidth:'600px'}}>
          <div style={{fontSize:'10px', letterSpacing:'4px', textTransform:'uppercase', color:'#B8962E', marginBottom:'24px', fontWeight:400}}>
            Раздел в разработке
          </div>
          <h1 style={{fontFamily:'"Cormorant Garamond", serif', fontSize:'52px', fontWeight:300, color:'#fff', lineHeight:1.15, marginBottom:'24px'}}>
            Электронная<br/><em style={{fontStyle:'italic', color:'#D4AF57'}}>техника</em>
          </h1>
          <p style={{fontSize:'14px', color:'#777', fontWeight:300, lineHeight:1.8, marginBottom:'48px'}}>
            Совсем скоро в нашем комиссионном магазине появится раздел электронной техники. Смартфоны, ноутбуки, планшеты, умные часы и аксессуары — всё с честным описанием состояния и по выгодным ценам.
          </p>
          <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1px', background:'#2A2520', marginBottom:'48px'}}>
            {[
              {icon:'📱', label:'Смартфоны'},
              {icon:'💻', label:'Ноутбуки'},
              {icon:'⌚', label:'Умные часы'},
              {icon:'🎧', label:'Аксессуары'},
            ].map(item => (
              <div key={item.label} style={{background:'#1E1A16', padding:'28px 16px', textAlign:'center'}}>
                <div style={{fontSize:'32px', marginBottom:'12px', opacity:.5}}>{item.icon}</div>
                <div style={{fontSize:'10px', letterSpacing:'2px', textTransform:'uppercase', color:'#555', fontWeight:300}}>{item.label}</div>
              </div>
            ))}
          </div>
          <div style={{display:'flex', alignItems:'center', justifyContent:'center', gap:'16px'}}>
            <div style={{width:'40px', height:'1px', background:'#2A2520'}}></div>
            <span style={{fontSize:'12px', color:'#444', fontWeight:300, letterSpacing:'1px'}}>Следите за обновлениями в Instagram и WhatsApp</span>
            <div style={{width:'40px', height:'1px', background:'#2A2520'}}></div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}