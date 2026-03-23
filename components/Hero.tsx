'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { getPhotosByCategory } from '@/lib/supabase'
import { useLang } from '@/lib/LangContext'
import { t } from '@/lib/translations'

export default function Hero() {
  const { lang } = useLang()
  const tr = t[lang]

  const [jewelryPhoto, setJewelryPhoto] = useState('')

  useEffect(() => {
    async function loadPhoto() {
      const photos = await getPhotosByCategory('rings')
      if (photos.length > 0) setJewelryPhoto(photos[Math.floor(Math.random() * photos.length)])
    }
    loadPhoto()
  }, [])

  return (
    <section style={{background:'#1A1612', display:'grid', gridTemplateColumns:'1fr 1fr', minHeight:'420px'}}>

      {/* LEFT */}
      <div style={{padding:'56px 80px', display:'flex', flexDirection:'column', justifyContent:'center'}}>
        <div style={{display:'inline-flex', alignItems:'center', gap:'10px', marginBottom:'22px'}}>
          <div style={{width:'28px', height:'1px', background:'#B8962E'}}></div>
          <span style={{fontSize:'10px', letterSpacing:'4px', textTransform:'uppercase', color:'#B8962E', fontWeight:400}}>{tr.hero_badge}</span>
        </div>
        <h1 style={{fontFamily:'"Cormorant Garamond", serif', fontSize:'46px', fontWeight:300, color:'#fff', lineHeight:1.15, marginBottom:'16px'}}>
          {tr.hero_title1}<br/>{tr.hero_title2} <em style={{fontStyle:'italic', color:'#D4AF57'}}>{tr.hero_title3}</em> {tr.hero_title4}
        </h1>
        <p style={{fontSize:'13px', fontWeight:300, color:'#888', lineHeight:1.8, maxWidth:'340px', marginBottom:'32px'}}>
          {tr.hero_desc}
        </p>
        <div style={{display:'flex', gap:'28px'}}>
          <div>
            <div style={{fontFamily:'"Cormorant Garamond", serif', fontSize:'28px', fontWeight:400, color:'#fff'}}>
              500<sup style={{color:'#B8962E', fontSize:'16px'}}>+</sup>
            </div>
            <div style={{fontSize:'10px', letterSpacing:'1.5px', textTransform:'uppercase', color:'#555', fontWeight:300, marginTop:'1px'}}>{tr.hero_stat1}</div>
          </div>
          <div>
            <div style={{fontFamily:'"Cormorant Garamond", serif', fontSize:'28px', fontWeight:400, color:'#fff'}}>
              40<sup style={{color:'#B8962E', fontSize:'16px'}}>%</sup>
            </div>
            <div style={{fontSize:'10px', letterSpacing:'1.5px', textTransform:'uppercase', color:'#555', fontWeight:300, marginTop:'1px'}}>{tr.hero_stat2}</div>
          </div>
          <div>
            <div style={{fontFamily:'"Cormorant Garamond", serif', fontSize:'28px', fontWeight:400, color:'#fff'}}>
              100<sup style={{color:'#B8962E', fontSize:'16px'}}>%</sup>
            </div>
            <div style={{fontSize:'10px', letterSpacing:'1.5px', textTransform:'uppercase', color:'#555', fontWeight:300, marginTop:'1px'}}>{tr.hero_stat3}</div>
          </div>
        </div>
      </div>

      {/* RIGHT — две категории */}
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', borderLeft:'1px solid #2A2520'}}>

        {/* УКРАШЕНИЯ */}
        <a href="/jewelry" style={{display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'36px 32px', cursor:'pointer', textDecoration:'none', borderRight:'1px solid #2A2520', position:'relative', overflow:'hidden'}}>
          {jewelryPhoto && (
            <img src={jewelryPhoto} alt="Украшения" style={{position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', opacity:.25}}/>
          )}
          <div style={{position:'relative', zIndex:2}}>
            <div style={{fontSize:'10px', letterSpacing:'3px', color:'#555', fontWeight:300, marginBottom:'8px'}}>01</div>
            <div style={{fontFamily:'"Cormorant Garamond", serif', fontSize:'26px', fontWeight:400, color:'#fff', marginBottom:'6px'}}>
              {tr.hero_cat1_title.split('\n')[0]}<br/>{tr.hero_cat1_title.split('\n')[1]}
            </div>
            <div style={{fontSize:'11px', color:'#B8962E', letterSpacing:'1px', fontWeight:300}}>
              {tr.hero_cat1_count}
            </div>
          </div>
          <div style={{position:'absolute', bottom:'28px', right:'28px', color:'#444', fontSize:'18px', zIndex:2}}>↗</div>
        </a>

        {/* ТЕХНИКА */}
        <a href="/tech" style={{display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'36px 32px', cursor:'pointer', textDecoration:'none', position:'relative', overflow:'hidden', background:'rgba(0,0,0,0.2)'}}>
          <div style={{position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', opacity:.06}}>
            <div style={{fontSize:'120px'}}>📱</div>
          </div>
          <div style={{position:'relative', zIndex:2}}>
            <div style={{fontSize:'10px', letterSpacing:'3px', color:'#555', fontWeight:300, marginBottom:'8px'}}>02</div>
            <div style={{fontFamily:'"Cormorant Garamond", serif', fontSize:'26px', fontWeight:400, color:'#fff', marginBottom:'6px'}}>
              {tr.hero_cat2_title.split('\n')[0]}<br/>{tr.hero_cat2_title.split('\n')[1]}
            </div>
            <div style={{fontSize:'11px', color:'#B8962E', letterSpacing:'1px', fontWeight:300}}>{tr.hero_cat2_count}</div>
          </div>
          <div style={{position:'absolute', top:'16px', right:'16px', background:'rgba(184,150,46,0.2)', border:'1px solid rgba(184,150,46,0.4)', padding:'4px 10px', fontSize:'9px', letterSpacing:'2px', textTransform:'uppercase', color:'#B8962E', zIndex:2}}>
            {tr.hero_cat2_badge}
          </div>
          <div style={{position:'absolute', bottom:'28px', right:'28px', color:'#444', fontSize:'18px', zIndex:2}}>↗</div>
        </a>

      </div>
    </section>
  )
}