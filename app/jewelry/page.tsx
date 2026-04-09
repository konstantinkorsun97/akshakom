'use client'
import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase, Product, getPhotosByCategory } from '@/lib/supabase'
import { getConditionStyle, getCategoryForProduct, getProductImage } from '@/lib/productImages'
import { useLang } from '@/lib/LangContext'
import { t } from '@/lib/translations'
import { useIsMobile } from '@/lib/useIsMobile'
import { useFavorites } from '@/lib/FavoritesContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

function JewelryContent() {
  const { lang } = useLang()
  const tr = t[lang]
  const isMobile = useIsMobile()
  const { toggleItem, isInFavorites } = useFavorites()
  const searchParams = useSearchParams()

  const CONDITIONS = [
    { value: 'Все', label: tr.jewelry_cond_all },
    { value: 'Отличное', label: tr.cond_excellent },
    { value: 'Хорошее', label: tr.cond_good },
    { value: 'Удовлетворительное', label: tr.cond_fair },
    { value: 'Дефект', label: tr.cond_defect },
  ]
  const PROBAS = [
    { value: 'Все', label: tr.jewelry_cond_all },
    { value: '375', label: '375' },
    { value: '500', label: '500' },
    { value: '585', label: '585' },
    { value: '750', label: '750' },
    { value: '999', label: '999' },
  ]
  const SORT_OPTIONS = [
    { label: tr.jewelry_sort_new, value: 'new' },
    { label: tr.jewelry_sort_asc, value: 'price_asc' },
    { label: tr.jewelry_sort_desc, value: 'price_desc' },
  ]

  const [products, setProducts] = useState<Product[]>([])
  const [photos, setPhotos] = useState<Record<string, string[]>>({})
  const [loading, setLoading] = useState(true)
  const [searchInput, setSearchInput] = useState('')
  const [search, setSearch] = useState('')
  const [condition, setCondition] = useState('Все')
  const [proba, setProba] = useState('Все')
  const [sort, setSort] = useState('new')
  const [page, setPage] = useState(0)
  const PER_PAGE = 12

  // Читаем ?q= из URL при первом рендере
  useEffect(() => {
    const q = searchParams.get('q') || ''
    if (q) { setSearch(q); setSearchInput(q) }
  }, [searchParams])

  useEffect(() => {
    async function load() {
      setLoading(true)
      let query = supabase.from('products').select('*').eq('is_active', true)
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
  }, [condition, proba, sort, page, search])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    setSearch(searchInput)
    setPage(0)
  }

  return (
    <div style={{ background: '#F7F4EF', minHeight: '100vh', padding: isMobile ? '20px 16px' : '40px', overflowX: 'hidden' }}>

      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: '#B8962E', marginBottom: '8px' }}>{tr.jewelry_catalog_label}</div>
        <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: isMobile ? '28px' : '42px', fontWeight: 300, color: '#1A1612', margin: 0 }}>
          {tr.jewelry_title} <em style={{ fontStyle: 'italic', color: '#4A4540' }}>{tr.jewelry_title_em}</em>
        </h1>
      </div>

      {/* ФИЛЬТРЫ */}
      <div style={{ background: '#fff', padding: isMobile ? '14px' : '20px 24px', marginBottom: '16px', border: '1px solid #E2D9CC', display: 'flex', gap: '12px', flexDirection: 'column' }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <svg style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '15px', height: '15px', stroke: '#4A4540', fill: 'none', strokeWidth: 1.5 }} viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input type="text" value={searchInput} onChange={e => setSearchInput(e.target.value)}
              placeholder={tr.jewelry_search_placeholder}
              style={{ width: '100%', padding: '9px 16px 9px 38px', border: '1px solid #E2D9CC', borderRight: 'none', background: '#F7F4EF', fontSize: '13px', fontFamily: '"Jost", sans-serif', outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <button type="submit"
            style={{ padding: '9px 20px', background: '#1A1612', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', fontFamily: '"Jost", sans-serif', whiteSpace: 'nowrap' }}>
            {lang === 'ru' ? 'Найти' : 'Іздеу'}
          </button>
        </form>

        {search && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#4A4540' }}>
            <span>{lang === 'ru' ? 'Результаты по:' : 'Нәтижелер:'} <strong>«{search}»</strong></span>
            <button onClick={() => { setSearch(''); setSearchInput(''); setPage(0) }}
              style={{ background: 'none', border: '1px solid #E2D9CC', cursor: 'pointer', padding: '2px 10px', fontSize: '11px', color: '#888', fontFamily: '"Jost", sans-serif' }}>
              ✕ {lang === 'ru' ? 'Сбросить' : 'Өшіру'}
            </button>
          </div>
        )}

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div>
            <div style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: '#B8962E', marginBottom: '6px', fontWeight: 400 }}>{tr.jewelry_filter_condition}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px' }}>
              {CONDITIONS.map((c) => (
                <button key={c.value} onClick={() => { setCondition(c.value); setPage(0) }}
                  style={{ padding: '6px 10px', fontSize: '10px', letterSpacing: '1px', background: condition === c.value ? '#1A1612' : 'transparent', color: condition === c.value ? '#fff' : '#4A4540', border: '1px solid #E2D9CC', cursor: 'pointer', fontFamily: '"Jost", sans-serif', whiteSpace: 'nowrap' }}>
                  {c.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: '#B8962E', marginBottom: '6px', fontWeight: 400 }}>{tr.jewelry_filter_proba}</div>
            <div style={{ display: 'flex', gap: '2px' }}>
              {PROBAS.map((p) => (
                <button key={p.value} onClick={() => { setProba(p.value); setPage(0) }}
                  style={{ padding: '6px 10px', fontSize: '10px', background: proba === p.value ? '#1A1612' : 'transparent', color: proba === p.value ? '#fff' : '#4A4540', border: '1px solid #E2D9CC', cursor: 'pointer', fontFamily: '"Jost", sans-serif' }}>
                  {p.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: '#B8962E', marginBottom: '6px', fontWeight: 400 }}>{tr.jewelry_filter_sort}</div>
            <select value={sort} onChange={e => { setSort(e.target.value); setPage(0) }}
              style={{ padding: '7px 12px', border: '1px solid #E2D9CC', background: '#F7F4EF', fontSize: '12px', fontFamily: '"Jost", sans-serif', color: '#1A1612', outline: 'none', cursor: 'pointer' }}>
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* ТОВАРЫ */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '80px', fontFamily: '"Cormorant Garamond", serif', fontSize: '24px', color: '#B8962E' }}>{tr.jewelry_loading}</div>
      ) : products.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px', fontFamily: '"Cormorant Garamond", serif', fontSize: '24px', color: '#4A4540' }}>
          {search ? (lang === 'ru' ? `По запросу «${search}» ничего не найдено` : `«${search}» бойынша ештеңе табылмады`) : tr.jewelry_empty}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '2px', background: '#E2D9CC' }}>
          {products.map(p => {
            const cond = getConditionStyle(p.condition)
            const cat = getCategoryForProduct(p.name_display)
            const catPhotos = photos[cat] || photos['default'] || []
            const img = getProductImage(catPhotos, p.id)
            const inFav = isInFavorites(String(p.id))
            return (
              <div key={p.id} style={{ background: '#fff', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                <div style={{ height: isMobile ? '150px' : '220px', position: 'relative', overflow: 'hidden', background: '#F9F6F0' }}>
                  <a href={`/jewelry/${p.id}`} style={{ display: 'block', height: '100%' }}>
                    {img && <img src={img} alt={p.name_display} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                  </a>
                  <div style={{ position: 'absolute', top: '8px', left: '8px', background: '#B8962E', color: '#fff', fontSize: '9px', letterSpacing: '1.5px', textTransform: 'uppercase', padding: '2px 6px', fontWeight: 500 }}>{p.proba}°</div>
                  <button onClick={() => toggleItem({ id: String(p.id), article: p.article, name: p.name_display, price: p.estimate_sum, proba: p.proba })}
                    style={{ position: 'absolute', top: '8px', right: '8px', background: inFav ? 'rgba(192,57,43,0.9)' : 'rgba(255,255,255,0.85)', border: 'none', cursor: 'pointer', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', transition: 'all 0.2s' }}>
                    {inFav ? '♥' : '♡'}
                  </button>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(26,22,18,0.65)', color: 'rgba(255,255,255,0.7)', fontSize: '8px', padding: '3px 6px', textAlign: 'center' }}>{tr.photo_note}</div>
                </div>
                <a href={`/jewelry/${p.id}`} style={{ textDecoration: 'none', padding: isMobile ? '8px 10px' : '14px 16px 8px', flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: '9px', letterSpacing: '1px', textTransform: 'uppercase', color: '#B8962E', marginBottom: '2px' }}>{tr.article} {p.article}</div>
                  <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: isMobile ? '14px' : '17px', fontWeight: 400, color: '#1A1612', marginBottom: '4px', lineHeight: 1.2 }}>{p.name_display}</div>
                  {p.defects && <div style={{ fontSize: '10px', color: '#854F0B', fontWeight: 300, marginBottom: '4px' }}>{p.defects}</div>}
                  <div style={{ marginBottom: '6px' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', fontSize: '8px', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 500, padding: '2px 6px', background: cond.bg, color: cond.color }}>
                      <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: cond.color, display: 'inline-block' }} />{cond.label}
                    </span>
                  </div>
                  <div style={{ fontSize: isMobile ? '13px' : '16px', fontWeight: 500, color: '#1A1612' }}>{p.estimate_sum?.toLocaleString('ru-RU')} ₸</div>
                </a>
              </div>
            )
          })}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '32px' }}>
        {page > 0 && (
          <button onClick={() => setPage(p => p - 1)}
            style={{ padding: '10px 24px', border: '1px solid #E2D9CC', background: '#fff', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer', fontFamily: '"Jost", sans-serif', color: '#4A4540' }}>
            {tr.jewelry_prev}
          </button>
        )}
        <button onClick={() => setPage(p => p + 1)}
          style={{ padding: '10px 24px', border: '1px solid #1A1612', background: '#1A1612', color: '#fff', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer', fontFamily: '"Jost", sans-serif' }}>
          {tr.jewelry_next}
        </button>
      </div>

      <div style={{ marginTop: '20px', padding: '10px 16px', background: '#F0EDE8', border: '1px solid #E2D9CC', fontSize: '11px', color: '#888', fontWeight: 300 }}>
        {tr.jewelry_disclaimer} <span style={{ color: '#B8962E' }}>+7 771 270 7975</span>
      </div>
    </div>
  )
}

// Главный компонент — оборачивает в Suspense
export default function JewelryPage() {
  return (
    <>
      <Header />
      <Suspense fallback={
        <div style={{ textAlign: 'center', padding: '120px', fontFamily: '"Cormorant Garamond", serif', fontSize: '24px', color: '#B8962E' }}>
          Загрузка...
        </div>
      }>
        <JewelryContent />
      </Suspense>
      <Footer />
    </>
  )
}
