'use client'
import { useLang } from '@/lib/LangContext'
import { t } from '@/lib/translations'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function ConsignPage() {
  const { lang } = useLang()
  const tr = t[lang]

  return (
    <>
      <Header />
      <div style={{background:'#F7F4EF', minHeight:'100vh'}}>

        {/* HERO */}
        <div style={{background:'#1A1612', padding:'64px 80px'}}>
          <div style={{fontSize:'10px', letterSpacing:'4px', textTransform:'uppercase', color:'#B8962E', marginBottom:'16px', fontWeight:400}}>{tr.consign_page_label}</div>
          <h1 style={{fontFamily:'"Cormorant Garamond", serif', fontSize:'48px', fontWeight:300, color:'#fff', marginBottom:'16px'}}>
            {tr.consign_page_title}<br/><em style={{fontStyle:'italic', color:'#D4AF57'}}>{tr.consign_page_title_em}</em>
          </h1>
          <p style={{fontSize:'14px', color:'#777', fontWeight:300, lineHeight:1.8, maxWidth:'560px', margin:0}}>
            {tr.consign_page_desc}
          </p>
        </div>

        {/* ДЛЯ ПОКУПАТЕЛЕЙ */}
        <div style={{padding:'64px 80px', borderBottom:'1px solid #E2D9CC'}}>
          <div style={{fontSize:'10px', letterSpacing:'4px', textTransform:'uppercase', color:'#B8962E', marginBottom:'16px', fontWeight:400}}>{tr.consign_buyers_label}</div>
          <h2 style={{fontFamily:'"Cormorant Garamond", serif', fontSize:'36px', fontWeight:300, color:'#1A1612', marginBottom:'40px'}}>{tr.consign_buyers_title}</h2>
          <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'2px', background:'#E2D9CC'}}>
            {tr.consign_buyers_steps.map(item => (
              <div key={item.num} style={{background:'#fff', padding:'36px 28px'}}>
                <div style={{fontFamily:'"Cormorant Garamond", serif', fontSize:'48px', fontWeight:300, color:'#E2D9CC', lineHeight:1, marginBottom:'16px'}}>{item.num}</div>
                <div style={{fontSize:'13px', fontWeight:500, letterSpacing:'1px', textTransform:'uppercase', color:'#1A1612', marginBottom:'12px'}}>{item.title}</div>
                <div style={{fontSize:'13px', color:'#4A4540', fontWeight:300, lineHeight:1.7}}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ДЛЯ ПРОДАВЦОВ */}
        <div style={{padding:'64px 80px', borderBottom:'1px solid #E2D9CC', background:'#fff'}}>
          <div style={{fontSize:'10px', letterSpacing:'4px', textTransform:'uppercase', color:'#B8962E', marginBottom:'16px', fontWeight:400}}>{tr.consign_sellers_label}</div>
          <h2 style={{fontFamily:'"Cormorant Garamond", serif', fontSize:'36px', fontWeight:300, color:'#1A1612', marginBottom:'40px'}}>{tr.consign_sellers_title}</h2>
          <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'2px', background:'#E2D9CC'}}>
            {tr.consign_sellers_steps.map(item => (
              <div key={item.num} style={{background:'#F7F4EF', padding:'36px 28px'}}>
                <div style={{fontFamily:'"Cormorant Garamond", serif', fontSize:'48px', fontWeight:300, color:'#E2D9CC', lineHeight:1, marginBottom:'16px'}}>{item.num}</div>
                <div style={{fontSize:'13px', fontWeight:500, letterSpacing:'1px', textTransform:'uppercase', color:'#1A1612', marginBottom:'12px'}}>{item.title}</div>
                <div style={{fontSize:'13px', color:'#4A4540', fontWeight:300, lineHeight:1.7}}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* УСЛОВИЯ */}
        <div style={{padding:'64px 80px', borderBottom:'1px solid #E2D9CC'}}>
          <div style={{fontSize:'10px', letterSpacing:'4px', textTransform:'uppercase', color:'#B8962E', marginBottom:'16px', fontWeight:400}}>{tr.consign_accept_label}</div>
          <h2 style={{fontFamily:'"Cormorant Garamond", serif', fontSize:'36px', fontWeight:300, color:'#1A1612', marginBottom:'40px'}}>{tr.consign_accept_title}</h2>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'40px'}}>
            <div>
              <div style={{fontSize:'13px', fontWeight:500, letterSpacing:'1px', textTransform:'uppercase', color:'#1A1612', marginBottom:'20px', paddingBottom:'12px', borderBottom:'1px solid #E2D9CC'}}>{tr.consign_gold_title}</div>
              {tr.consign_gold_items.map(item => (
                <div key={item} style={{display:'flex', gap:'12px', alignItems:'flex-start', marginBottom:'12px'}}>
                  <div style={{width:'6px', height:'6px', borderRadius:'50%', background:'#B8962E', flexShrink:0, marginTop:'5px'}}></div>
                  <div style={{fontSize:'13px', color:'#4A4540', fontWeight:300}}>{item}</div>
                </div>
              ))}
            </div>
            <div>
              <div style={{fontSize:'13px', fontWeight:500, letterSpacing:'1px', textTransform:'uppercase', color:'#1A1612', marginBottom:'20px', paddingBottom:'12px', borderBottom:'1px solid #E2D9CC'}}>{tr.consign_tech_title}</div>
              {tr.consign_tech_items.map(item => (
                <div key={item} style={{display:'flex', gap:'12px', alignItems:'flex-start', marginBottom:'12px'}}>
                  <div style={{width:'6px', height:'6px', borderRadius:'50%', background:'#B8962E', flexShrink:0, marginTop:'5px'}}></div>
                  <div style={{fontSize:'13px', color:'#4A4540', fontWeight:300}}>{item}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{background:'#1A1612', padding:'64px 80px', display:'flex', justifyContent:'space-between', alignItems:'center', gap:'40px'}}>
          <div>
            <div style={{fontFamily:'"Cormorant Garamond", serif', fontSize:'36px', fontWeight:300, color:'#fff', marginBottom:'8px'}}>
              {tr.consign_cta_title} <em style={{fontStyle:'italic', color:'#D4AF57'}}>{tr.consign_cta_title_em}</em>
            </div>
            <div style={{fontSize:'13px', color:'#666', fontWeight:300}}>{tr.consign_cta_desc}</div>
          </div>
          <div style={{display:'flex', gap:'16px', flexShrink:0}}>
            <a href="tel:+77712707975" style={{background:'#B8962E', color:'#fff', padding:'14px 32px', fontSize:'11px', letterSpacing:'2px', textTransform:'uppercase', textDecoration:'none', fontFamily:'"Jost", sans-serif'}}>
              {tr.consign_cta_call}
            </a>
            <a href="https://wa.me/77712707975" style={{border:'1px solid #2A2520', color:'#888', padding:'14px 32px', fontSize:'11px', letterSpacing:'2px', textTransform:'uppercase', textDecoration:'none', fontFamily:'"Jost", sans-serif'}}>
              {tr.consign_cta_whatsapp}
            </a>
          </div>
        </div>

      </div>
      <Footer />
    </>
  )
}
