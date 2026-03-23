'use client'
import { useEffect, useState } from 'react'
import { supabase, Product, getPhotosByCategory } from '@/lib/supabase'
import { getConditionStyle, getCategoryForProduct, getProductImage } from '@/lib/productImages'
import { useLang } from '@/lib/LangContext'
import { t } from '@/lib/translations'

export default function GoldSection() {
  const { lang } = useLang()
  const tr = t[lang]

  const [products, setProducts] = useState<Product[]>([])
  const [photos, setPhotos] = useState<Record<string, string[]>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('open_date', { ascending: false })
        .limit(8)
      
      if (data) {
        setProducts(data)
        const cats = [...new Set(data.map(p => getCategoryForProduct(p.name_display)))]
        const photoMap: Record<string, string[]> = {}
        await Promise.all(cats.map(async cat => {
          photoMap[cat] = await getPhotosByCategory(cat)
          if (photoMap[cat].length === 0) {
            photoMap[cat] = await getPhotosByCategory('default')
          }
        }))
        setPhotos(photoMap)
      }
      setLoading(false)
    }
    load()
  }, [])

  return (
    <section style={{padding:'56px 40px', background:'#F7F4EF'}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'28px'}}>
        <div>
          <div style={{fontSize:'10px', letterSpacing:'4px', textTransform:'uppercase', color:'#B8962E', fontWeight:400, marginBottom:'6px'}}>{tr.gold_section_label}</div>
          <div style={{fontFamily:'"Cormorant Garamond", serif', fontSize:'34px', fontWeight:300, color:'#1A1612', lineHeight:1.1}}>
            {tr.gold_section_title} <em style={{fontStyle:'italic', color:'#4A4540'}}>{tr.gold_section_title_em}</em>
          </div>
        </div>
        <a href="/jewelry" style={{fontSize:'11px', letterSpacing:'2px', textTransform:'uppercase', color:'#4A4540', textDecoration:'none'}}>{tr.gold_section_all}</a>
      </div>

      {loading ? (
        <div style={{textAlign:'center', padding:'60px', color:'#B8962E', fontFamily:'"Cormorant Garamond", serif', fontSize:'20px'}}>
          {lang === 'ru' ? 'Загрузка...' : 'Жүктелуде...'}
        </div>
      ) : (
        <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'2px', background:'#E2D9CC'}}>
          {products.map((p) => {
            const cond = getConditionStyle(p.condition)
            const cat = getCategoryForProduct(p.name_display)
            const catPhotos = photos[cat] || photos['default'] || []
            const img = getProductImage(catPhotos, p.id)
            return (
              <div key={p.id} style={{background:'#fff', display:'flex', flexDirection:'column'}}>
                <div style={{height:'220px', position:'relative', overflow:'hidden', background:'#F9F6F0'}}>
                  {img && <img src={img} alt={p.name_display} style={{width:'100%', height:'100%', objectFit:'cover'}}/>}
                  <div style={{position:'absolute', top:'10px', left:'10px', background:'#B8962E', color:'#fff', fontSize:'9px', letterSpacing:'1.5px', textTransform:'uppercase', padding:'3px 8px', fontWeight:500}}>
                    {p.proba}°
                  </div>
                  <div style={{position:'absolute', bottom:0, left:0, right:0, background:'rgba(26,22,18,0.65)', color:'rgba(255,255,255,0.7)', fontSize:'8px', padding:'4px 8px', textAlign:'center'}}>
                    {tr.photo_note}
                  </div>
                </div>
                <div style={{padding:'14px 16px 8px', flex:1}}>
                  <div style={{fontSize:'10px', letterSpacing:'1.5px', textTransform:'uppercase', color:'#B8962E', marginBottom:'3px', fontWeight:400}}>{tr.article} {p.article}</div>
                  <div style={{fontFamily:'"Cormorant Garamond", serif', fontSize:'17px', fontWeight:400, color:'#1A1612', marginBottom:'3px', lineHeight:1.2}}>{p.name_display}</div>
                  {p.defects && <div style={{fontSize:'11px', color:'#854F0B', fontWeight:300, marginBottom:'8px'}}>{p.defects}</div>}
                  <div style={{display:'flex', alignItems:'center', gap:'8px', marginBottom:'8px'}}>
                    <span style={{display:'inline-flex', alignItems:'center', gap:'4px', fontSize:'9px', letterSpacing:'1.5px', textTransform:'uppercase', fontWeight:500, padding:'3px 7px', background:cond.bg, color:cond.color}}>
                      <span style={{width:'5px', height:'5px', borderRadius:'50%', background:cond.color, display:'inline-block'}}></span>
                      {cond.label}
                    </span>
                  </div>
                  <div><span style={{fontSize:'16px', fontWeight:500, color:'#1A1612'}}>{p.estimate_sum?.toLocaleString('ru-RU')} ₸</span></div>
                </div>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'9px 16px 12px', borderTop:'1px solid #E2D9CC', marginTop:'auto'}}>
                  <button style={{background:'none', border:'none', cursor:'pointer', color:'#4A4540', fontSize:'10px', letterSpacing:'1px', textTransform:'uppercase', fontFamily:'"Jost", sans-serif'}}>{tr.in_favorites}</button>
                  <button style={{background:'#1A1612', color:'#fff', border:'none', cursor:'pointer', fontSize:'9px', letterSpacing:'2px', textTransform:'uppercase', padding:'7px 14px', fontFamily:'"Jost", sans-serif'}}>{tr.more}</button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <div style={{marginTop:'16px', padding:'12px 20px', background:'#F0EDE8', border:'1px solid #E2D9CC', fontSize:'11px', color:'#888', fontWeight:300, lineHeight:1.6}}>
        {tr.photo_disclaimer}{' '}
        <span style={{color:'#B8962E'}}>+7 771 270 7975</span> {lang === 'ru' ? 'или в WhatsApp.' : 'немесе WhatsApp арқылы.'}
      </div>
    </section>
  )
}