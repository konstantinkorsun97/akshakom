'use client'
import { useEffect, useState } from 'react'
import { supabase, Product, getPhotosByCategory } from '@/lib/supabase'
import { getConditionStyle, getCategoryForProduct, getProductImage } from '@/lib/productImages'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

function getWeekSeed(): number {
  const now = new Date()
  const year = now.getFullYear()
  const week = Math.floor((now.getTime() - new Date(year, 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000))
  return year * 100 + week
}

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr]
  let s = seed
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0xffffffff
    const j = Math.abs(s) % (i + 1);
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function TrendingPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [photos, setPhotos] = useState<Record<string, string[]>>({})
  const [loading, setLoading] = useState(true)

  const seed = getWeekSeed()
  const nextMonday = (() => {
    const d = new Date()
    const day = d.getDay()
    const diff = day === 0 ? 1 : 8 - day
    d.setDate(d.getDate() + diff)
    d.setHours(9, 0, 0, 0)
    return d.toLocaleDateString('ru-RU', { day:'numeric', month:'long' })
  })()

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)

      if (data) {
        const shuffled = seededShuffle(data, seed).slice(0, 50)
        setProducts(shuffled)

        const cats = [...new Set(shuffled.map(p => getCategoryForProduct(p.name_display)))]
        const photoMap: Record<string, string[]> = {}
        await Promise.all(cats.map(async cat => {
          photoMap[cat] = await getPhotosByCategory(cat)
          if (photoMap[cat].length === 0) photoMap[cat] = await getPhotosByCategory('default')
        }))
        setPhotos(photoMap)
      }
      setLoading(false)
    }
    load()
  }, [])

  return (
    <>
      <Header />
      <div style={{background:'#F7F4EF', minHeight:'100vh'}}>

        {/* HERO */}
        <div style={{background:'#1A1612', padding:'56px 80px', display:'flex', justifyContent:'space-between', alignItems:'flex-end'}}>
          <div>
            <div style={{fontSize:'10px', letterSpacing:'4px', textTransform:'uppercase', color:'#B8962E', marginBottom:'16px', fontWeight:400}}>Подборка недели</div>
            <h1 style={{fontFamily:'"Cormorant Garamond", serif', fontSize:'48px', fontWeight:300, color:'#fff', margin:0}}>
              Сейчас <em style={{fontStyle:'italic', color:'#D4AF57'}}>популярно</em>
            </h1>
          </div>
          <div style={{textAlign:'right'}}>
            <div style={{fontSize:'12px', color:'#555', fontWeight:300, marginBottom:'4px'}}>Подборка обновится</div>
            <div style={{fontSize:'14px', color:'#B8962E', fontWeight:400}}>{nextMonday} в 9:00</div>
          </div>
        </div>

        <div style={{padding:'40px'}}>
          <div style={{marginBottom:'24px', padding:'12px 20px', background:'#fff', border:'1px solid #E2D9CC', fontSize:'12px', color:'#888', fontWeight:300, display:'flex', gap:'8px', alignItems:'center'}}>
            <span style={{color:'#B8962E'}}>✦</span>
            Подборка из 50 украшений автоматически обновляется каждый понедельник в 9:00
          </div>

          {loading ? (
            <div style={{textAlign:'center', padding:'80px', fontFamily:'"Cormorant Garamond", serif', fontSize:'24px', color:'#B8962E'}}>Загрузка...</div>
          ) : (
            <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'2px', background:'#E2D9CC'}}>
              {products.map(p => {
                const cond = getConditionStyle(p.condition)
                const cat = getCategoryForProduct(p.name_display)
                const catPhotos = photos[cat] || photos['default'] || []
                const img = getProductImage(catPhotos, p.id)
                return (
                  <a key={p.id} href={`/jewelry/${p.id}`} style={{background:'#fff', display:'flex', flexDirection:'column', textDecoration:'none'}}>
                    <div style={{height:'220px', position:'relative', overflow:'hidden', background:'#F9F6F0'}}>
                      {img && <img src={img} alt={p.name_display} style={{width:'100%', height:'100%', objectFit:'cover'}}/>}
                      <div style={{position:'absolute', top:'10px', left:'10px', background:'#B8962E', color:'#fff', fontSize:'9px', letterSpacing:'1.5px', textTransform:'uppercase', padding:'3px 8px', fontWeight:500}}>{p.proba}°</div>
                      <div style={{position:'absolute', bottom:0, left:0, right:0, background:'rgba(26,22,18,0.65)', color:'rgba(255,255,255,0.7)', fontSize:'8px', padding:'4px 8px', textAlign:'center'}}>Фото носит иллюстративный характер</div>
                    </div>
                    <div style={{padding:'14px 16px 8px', flex:1}}>
                      <div style={{fontSize:'10px', letterSpacing:'1.5px', textTransform:'uppercase', color:'#B8962E', marginBottom:'3px'}}>Арт. {p.article}</div>
                      <div style={{fontFamily:'"Cormorant Garamond", serif', fontSize:'17px', fontWeight:400, color:'#1A1612', marginBottom:'3px', lineHeight:1.2}}>{p.name_display}</div>
                      {p.defects && <div style={{fontSize:'11px', color:'#854F0B', fontWeight:300, marginBottom:'6px'}}>{p.defects}</div>}
                      <div style={{display:'flex', alignItems:'center', gap:'8px', marginBottom:'8px'}}>
                        <span style={{display:'inline-flex', alignItems:'center', gap:'4px', fontSize:'9px', letterSpacing:'1.5px', textTransform:'uppercase', fontWeight:500, padding:'3px 7px', background:cond.bg, color:cond.color}}>
                          <span style={{width:'5px', height:'5px', borderRadius:'50%', background:cond.color, display:'inline-block'}}></span>
                          {cond.label}
                        </span>
                      </div>
                      <div style={{fontSize:'16px', fontWeight:500, color:'#1A1612'}}>{p.estimate_sum?.toLocaleString('ru-RU')} ₸</div>
                    </div>
                  </a>
                )
              })}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}