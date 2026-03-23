'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase, Product, getPhotosByCategory } from '@/lib/supabase'
import { getConditionStyle, getCategoryForProduct, getProductImage } from '@/lib/productImages'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function ProductPage() {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [img, setImg] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single()

      if (data) {
        setProduct(data)
        const cat = getCategoryForProduct(data.name_display)
        const photos = await getPhotosByCategory(cat)
        const fallback = photos.length === 0 ? await getPhotosByCategory('default') : photos
        setImg(getProductImage(fallback, data.id))
      }
      setLoading(false)
    }
    load()
  }, [id])

  if (loading) return (
    <>
      <Header />
      <div style={{textAlign:'center', padding:'120px', fontFamily:'"Cormorant Garamond", serif', fontSize:'24px', color:'#B8962E'}}>Загрузка...</div>
      <Footer />
    </>
  )

  if (!product) return (
    <>
      <Header />
      <div style={{textAlign:'center', padding:'120px', fontFamily:'"Cormorant Garamond", serif', fontSize:'24px', color:'#4A4540'}}>Товар не найден</div>
      <Footer />
    </>
  )

  const cond = getConditionStyle(product.condition)

  return (
    <>
      <Header />
      <div style={{background:'#F7F4EF', minHeight:'100vh', padding:'48px 80px'}}>

        {/* ХЛЕБНЫЕ КРОШКИ */}
        <div style={{fontSize:'11px', color:'#888', letterSpacing:'1px', marginBottom:'32px', display:'flex', gap:'8px', alignItems:'center'}}>
          <a href="/" style={{color:'#888', textDecoration:'none'}}>Главная</a>
          <span>→</span>
          <a href="/jewelry" style={{color:'#888', textDecoration:'none'}}>Украшения из золота</a>
          <span>→</span>
          <span style={{color:'#1A1612'}}>Арт. {product.article}</span>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'64px'}}>

          {/* ФОТО */}
          <div>
            <div style={{position:'relative', aspectRatio:'1', overflow:'hidden', background:'#F0EDE8'}}>
              {img && <img src={img} alt={product.name_display} style={{width:'100%', height:'100%', objectFit:'cover'}}/>}
              <div style={{position:'absolute', top:'16px', left:'16px', background:'#B8962E', color:'#fff', fontSize:'10px', letterSpacing:'2px', textTransform:'uppercase', padding:'5px 12px', fontWeight:500}}>
                {product.proba}°
              </div>
            </div>
            <div style={{marginTop:'12px', padding:'10px 16px', background:'#F0EDE8', border:'1px solid #E2D9CC', fontSize:'11px', color:'#888', fontWeight:300}}>
              * Фото носит иллюстративный характер. Для фото реального изделия обращайтесь по тел. <span style={{color:'#B8962E'}}>+7 (7212) 00-00-00</span>
            </div>
          </div>

          {/* ИНФО */}
          <div>
            <div style={{fontSize:'11px', letterSpacing:'2px', textTransform:'uppercase', color:'#B8962E', marginBottom:'8px'}}>Арт. {product.article}</div>
            <h1 style={{fontFamily:'"Cormorant Garamond", serif', fontSize:'38px', fontWeight:300, color:'#1A1612', marginBottom:'16px', lineHeight:1.15}}>{product.name_display}</h1>

            {/* СОСТОЯНИЕ */}
            <div style={{display:'flex', alignItems:'center', gap:'10px', marginBottom:'24px'}}>
              <span style={{display:'inline-flex', alignItems:'center', gap:'6px', fontSize:'11px', letterSpacing:'1.5px', textTransform:'uppercase', fontWeight:500, padding:'6px 12px', background:cond.bg, color:cond.color}}>
                <span style={{width:'6px', height:'6px', borderRadius:'50%', background:cond.color, display:'inline-block'}}></span>
                {product.condition}
              </span>
            </div>

            {/* ДЕФЕКТЫ */}
            {product.defects && (
              <div style={{padding:'12px 16px', background:'#FAEEDA', border:'1px solid #F0D4A0', marginBottom:'24px', fontSize:'13px', color:'#854F0B', fontWeight:300}}>
                ⚠ {product.defects}
              </div>
            )}

            {/* ХАРАКТЕРИСТИКИ */}
            <div style={{border:'1px solid #E2D9CC', marginBottom:'32px'}}>
              {[
                ['Проба', `${product.proba}°`],
                ['Вес без камня', product.weight_without_stone ? `${product.weight_without_stone} г` : '—'],
                ['Вес с камнем', product.weight_with_stone && product.weight_with_stone > 0 ? `${product.weight_with_stone} г` : '—'],
                ['Дата приёма', product.open_date],
                ['Состояние', product.condition],
                ['Артикул', product.article],
              ].map(([label, value]) => (
                <div key={label} style={{display:'flex', borderBottom:'1px solid #E2D9CC', padding:'12px 16px'}}>
                  <div style={{width:'160px', fontSize:'12px', color:'#888', fontWeight:300, letterSpacing:'.5px'}}>{label}</div>
                  <div style={{fontSize:'13px', color:'#1A1612', fontWeight:400}}>{value}</div>
                </div>
              ))}
            </div>

            {/* ЦЕНА */}
            <div style={{marginBottom:'32px'}}>
              <div style={{fontSize:'12px', color:'#888', letterSpacing:'1px', textTransform:'uppercase', marginBottom:'6px', fontWeight:300}}>Цена</div>
              <div style={{fontFamily:'"Cormorant Garamond", serif', fontSize:'42px', fontWeight:400, color:'#1A1612'}}>
                {product.estimate_sum?.toLocaleString('ru-RU')} ₸
              </div>
            </div>

            {/* КНОПКИ */}
            <div style={{display:'flex', gap:'12px', marginBottom:'24px'}}>
              <button style={{flex:1, background:'#1A1612', color:'#fff', border:'none', padding:'16px', fontSize:'11px', letterSpacing:'3px', textTransform:'uppercase', cursor:'pointer', fontFamily:'"Jost", sans-serif'}}>
                В корзину
              </button>
              <button style={{padding:'16px 20px', background:'transparent', border:'1px solid #E2D9CC', cursor:'pointer', color:'#4A4540', fontSize:'18px'}}>
                ♡
              </button>
            </div>

            {/* КОНТАКТЫ */}
            <div style={{padding:'16px', background:'#fff', border:'1px solid #E2D9CC', fontSize:'12px', color:'#4A4540', fontWeight:300, lineHeight:1.7}}>
              Есть вопросы по изделию? Свяжитесь с нами:<br/>
              <span style={{color:'#B8962E', fontWeight:400}}>+7 (7212) 00-00-00</span> · WhatsApp · Instagram
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}