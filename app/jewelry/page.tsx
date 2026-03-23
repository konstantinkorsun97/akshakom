'use client'
import { useEffect, useState } from 'react'
import { supabase, Product, getPhotosByCategory } from '@/lib/supabase'
import { getConditionStyle, getCategoryForProduct, getProductImage } from '@/lib/productImages'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const CONDITIONS = ['Все', 'Отличное', 'Хорошее', 'Удовлетворительное', 'Дефект']
const PROBAS = ['Все', '375', '500', '585', '750', '999']
const SORT_OPTIONS = [
  { label: 'Сначала новые', value: 'new' },
  { label: 'Дешевле', value: 'price_asc' },
  { label: 'Дороже', value: 'price_desc' },
]

export default function JewelryPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [photos, setPhotos] = useState<Record<string, string[]>>({})
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [condition, setCondition] = useState('Все')
  const [proba, setProba] = useState('Все')
  const [sort, setSort] = useState('new')
  const [page, setPage] = useState(0)
  const PER_PAGE = 12

  useEffect(() => {
    async function load() {
      setLoading(true)
      let query = supabase
        .from('products')
        .select('*')
        .eq('is_active', true)

      if (condition !== 'Все') query = query.eq('condition', condition)
      if (proba !== 'Все') query = query.eq('proba', parseInt(proba))
      if (sort === 'new') query = query.order('open_date', { ascending: false })
      if (sort === 'price_asc') query = query.order('estimate_sum', { ascending: true })
      if (sort === 'price_desc') query = query.order('estimate_sum', { ascending: false })

      query = query.range(page * PER_PAGE, (page + 1) * PER_PAGE - 1)

      const { data } = await query
      if (data) {
        const filtered = search
          ? data.filter(p =>
              p.name_display.toLowerCase().includes(search.toLowerCase()) ||
              p.article?.toLowerCase().includes(search.toLowerCase()) ||
              p.description_raw?.toLowerCase().includes(search.toLowerCase())
            )
          : data
        setProducts(filtered)

        const cats = [...new Set(filtered.map(p => getCategoryForProduct(p.name_display)))]
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
  }, [condition, proba, sort, page])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    setPage(0)
  }

  return (
    <>
      <Header />
      <div style={{background:'#F7F4EF', minHeight:'100vh', padding:'40px'}}>

        {/* ЗАГОЛОВОК */}
        <div style={{marginBottom:'32px'}}>
          <div style={{fontSize:'10px', letterSpacing:'4px', textTransform:'uppercase', color:'#B8962E', marginBottom:'8px'}}>Каталог</div>
          <h1 style={{fontFamily:'"Cormorant Garamond", serif', fontSize:'42px', fontWeight:300, color:'#1A1612', margin:0}}>
            Украшения из <em style={{fontStyle:'italic', color:'#4A4540'}}>золота</em>
          </h1>
        </div>

        {/* ФИЛЬТРЫ */}
        <div style={{background:'#fff', padding:'20px 24px', marginBottom:'24px', border:'1px solid #E2D9CC', display:'flex', gap:'24px', alignItems:'flex-end', flexWrap:'wrap'}}>

          {/* ПОИСК */}
          <form onSubmit={handleSearch} style={{flex:1, minWidth:'200px', position:'relative'}}>
            <svg style={{position:'absolute', left:'12px', top:'50%', transform:'translateY(-50%)', width:'15px', height:'15px', stroke:'#4A4540', fill:'none', strokeWidth:1.5}} viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Поиск по артикулу или названию..."
              style={{width:'100%', padding:'9px 16px 9px 38px', border:'1px solid #E2D9CC', background:'#F7F4EF', fontSize:'13px', fontFamily:'"Jost", sans-serif', outline:'none'}}
            />
          </form>

          {/* СОСТОЯНИЕ */}
          <div>
            <div style={{fontSize:'10px', letterSpacing:'2px', textTransform:'uppercase', color:'#B8962E', marginBottom:'6px', fontWeight:400}}>Состояние</div>
            <div style={{display:'flex', gap:'0'}}>
              {CONDITIONS.map(c => (
                <button key={c} onClick={() => { setCondition(c); setPage(0) }}
                  style={{padding:'7px 14px', fontSize:'11px', letterSpacing:'1px', background: condition === c ? '#1A1612' : 'transparent', color: condition === c ? '#fff' : '#4A4540', border:'1px solid #E2D9CC', borderRight:'none', cursor:'pointer', fontFamily:'"Jost", sans-serif', whiteSpace:'nowrap', ...(c === CONDITIONS[CONDITIONS.length-1] ? {borderRight:'1px solid #E2D9CC'} : {})}}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* ПРОБА */}
          <div>
            <div style={{fontSize:'10px', letterSpacing:'2px', textTransform:'uppercase', color:'#B8962E', marginBottom:'6px', fontWeight:400}}>Проба</div>
            <div style={{display:'flex', gap:'0'}}>
              {PROBAS.map((p, i) => (
                <button key={p} onClick={() => { setProba(p); setPage(0) }}
                  style={{padding:'7px 12px', fontSize:'11px', background: proba === p ? '#1A1612' : 'transparent', color: proba === p ? '#fff' : '#4A4540', border:'1px solid #E2D9CC', borderRight: i < PROBAS.length-1 ? 'none' : '1px solid #E2D9CC', cursor:'pointer', fontFamily:'"Jost", sans-serif'}}>
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* СОРТИРОВКА */}
          <div>
            <div style={{fontSize:'10px', letterSpacing:'2px', textTransform:'uppercase', color:'#B8962E', marginBottom:'6px', fontWeight:400}}>Сортировка</div>
            <select value={sort} onChange={e => { setSort(e.target.value); setPage(0) }}
              style={{padding:'8px 16px', border:'1px solid #E2D9CC', background:'#F7F4EF', fontSize:'12px', fontFamily:'"Jost", sans-serif', color:'#1A1612', outline:'none', cursor:'pointer'}}>
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>

        {/* ТОВАРЫ */}
        {loading ? (
          <div style={{textAlign:'center', padding:'80px', fontFamily:'"Cormorant Garamond", serif', fontSize:'24px', color:'#B8962E'}}>Загрузка...</div>
        ) : products.length === 0 ? (
          <div style={{textAlign:'center', padding:'80px', fontFamily:'"Cormorant Garamond", serif', fontSize:'24px', color:'#4A4540'}}>Ничего не найдено</div>
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

        {/* ПАГИНАЦИЯ */}
        <div style={{display:'flex', justifyContent:'center', gap:'8px', marginTop:'40px'}}>
          {page > 0 && (
            <button onClick={() => setPage(p => p - 1)}
              style={{padding:'10px 28px', border:'1px solid #E2D9CC', background:'#fff', fontSize:'11px', letterSpacing:'2px', textTransform:'uppercase', cursor:'pointer', fontFamily:'"Jost", sans-serif', color:'#4A4540'}}>
              ← Назад
            </button>
          )}
          <button onClick={() => setPage(p => p + 1)}
            style={{padding:'10px 28px', border:'1px solid #1A1612', background:'#1A1612', color:'#fff', fontSize:'11px', letterSpacing:'2px', textTransform:'uppercase', cursor:'pointer', fontFamily:'"Jost", sans-serif'}}>
            Ещё →
          </button>
        </div>

        {/* ДИСКЛЕЙМЕР */}
        <div style={{marginTop:'24px', padding:'12px 20px', background:'#F0EDE8', border:'1px solid #E2D9CC', fontSize:'11px', color:'#888', fontWeight:300}}>
          * Фотографии носят иллюстративный характер. Для фото конкретного изделия обращайтесь по тел. <span style={{color:'#B8962E'}}>+7 (7212) 00-00-00</span> или в WhatsApp.
        </div>
      </div>
      <Footer />
    </>
  )
}