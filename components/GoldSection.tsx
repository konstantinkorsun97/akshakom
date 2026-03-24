'use client'
import { useEffect, useState } from 'react'
import { supabase, Product, getPhotosByCategory } from '@/lib/supabase'
import { getConditionStyle, getCategoryForProduct, getProductImage } from '@/lib/productImages'
import { useLang } from '@/lib/LangContext'
import { t } from '@/lib/translations'
import { useIsMobile } from '@/lib/useIsMobile'
import { useFavorites } from '@/lib/FavoritesContext'

export default function GoldSection() {
  const { lang } = useLang()
  const tr = t[lang]
  const isMobile = useIsMobile()
  const { toggleItem, isInFavorites } = useFavorites()
  const [products, setProducts] = useState<Product[]>([])
  const [photos, setPhotos] = useState<Record<string, string[]>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('products').select('*').eq('is_active', true)
        .order('open_date', { ascending: false }).limit(8)
      if (data) {
        setProducts(data)
        const cats = [...new Set(data.map(p => getCategoryForProduct(p.name_display)))]
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
    <section style={{ padding: isMobile ? '32px 16px' : '56px 40px', background: '#F7F4EF', overflowX: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '28px' }}>
        <div>
          <div style={{ fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: '#B8962E', fontWeight: 400, marginBottom: '6px' }}>{tr.gold_section_label}</div>
          <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: isMobile ? '26px' : '34px', fontWeight: 300, color: '#1A1612', lineHeight: 1.1 }}>
            {tr.gold_section_title} <em style={{ fontStyle: 'italic', color: '#4A4540' }}>{tr.gold_section_title_em}</em>
          </div>
        </div>
        {!isMobile && (
          <a href="/jewelry" style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#4A4540', textDecoration: 'none' }}>{tr.gold_section_all}</a>
        )}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#B8962E', fontFamily: '"Cormorant Garamond", serif', fontSize: '20px' }}>
          {lang === 'ru' ? 'Загрузка...' : 'Жүктелуде...'}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '2px', background: '#E2D9CC', width: '100%' }}>
          {products.map((p) => {
            const cond = getConditionStyle(p.condition)
            const cat = getCategoryForProduct(p.name_display)
            const catPhotos = photos[cat] || photos['default'] || []
            const img = getProductImage(catPhotos, p.id)
            const inFav = isInFavorites(String(p.id))
            return (
              <div key={p.id} style={{ background: '#fff', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                <div style={{ height: isMobile ? '150px' : '220px', position: 'relative', overflow: 'hidden', background: '#F9F6F0' }}>
                  {img && <img src={img} alt={p.name_display} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                  <div style={{ position: 'absolute', top: '8px', left: '8px', background: '#B8962E', color: '#fff', fontSize: '9px', letterSpacing: '1.5px', textTransform: 'uppercase', padding: '2px 6px', fontWeight: 500 }}>{p.proba}°</div>
                  {/* КНОПКА ИЗБРАННОГО НА ФОТО */}
                  <button
                    onClick={() => toggleItem({ id: String(p.id), article: p.article, name: p.name_display, price: p.estimate_sum, proba: p.proba })}
                    style={{ position: 'absolute', top: '8px', right: '8px', background: inFav ? 'rgba(192,57,43,0.9)' : 'rgba(255,255,255,0.85)', border: 'none', cursor: 'pointer', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', transition: 'all 0.2s' }}>
                    {inFav ? '♥' : '♡'}
                  </button>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(26,22,18,0.65)', color: 'rgba(255,255,255,0.7)', fontSize: '8px', padding: '3px 6px', textAlign: 'center' }}>{tr.photo_note}</div>
                </div>
                <div style={{ padding: isMobile ? '8px 10px 4px' : '14px 16px 8px', flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '9px', letterSpacing: '1px', textTransform: 'uppercase', color: '#B8962E', marginBottom: '2px', fontWeight: 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{tr.article} {p.article}</div>
                  <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: isMobile ? '14px' : '17px', fontWeight: 400, color: '#1A1612', marginBottom: '3px', lineHeight: 1.2, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{p.name_display}</div>
                  {p.defects && <div style={{ fontSize: '10px', color: '#854F0B', fontWeight: 300, marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.defects}</div>}
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', fontSize: '8px', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 500, padding: '2px 6px', background: cond.bg, color: cond.color }}>
                      <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: cond.color, display: 'inline-block', flexShrink: 0 }} />
                      {cond.label}
                    </span>
                  </div>
                  <div style={{ fontSize: isMobile ? '13px' : '16px', fontWeight: 500, color: '#1A1612' }}>{p.estimate_sum?.toLocaleString('ru-RU')} ₸</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: isMobile ? '6px 10px 8px' : '9px 16px 12px', borderTop: '1px solid #E2D9CC', marginTop: 'auto' }}>
                  <a href={`/jewelry/${p.id}`} style={{ background: '#1A1612', color: '#fff', fontSize: '9px', letterSpacing: isMobile ? '1.5px' : '2px', textTransform: 'uppercase', padding: isMobile ? '6px 12px' : '7px 14px', fontFamily: '"Jost", sans-serif', textDecoration: 'none' }}>{tr.more}</a>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {isMobile && (
        <div style={{ marginTop: '16px', textAlign: 'center' }}>
          <a href="/jewelry" style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#4A4540', textDecoration: 'none', border: '1px solid #E2D9CC', padding: '10px 24px', display: 'inline-block' }}>{tr.gold_section_all}</a>
        </div>
      )}

      <div style={{ marginTop: '16px', padding: '10px 16px', background: '#F0EDE8', border: '1px solid #E2D9CC', fontSize: '11px', color: '#888', fontWeight: 300, lineHeight: 1.6 }}>
        {tr.photo_disclaimer}{' '}<span style={{ color: '#B8962E' }}>+7 771 270 7975</span>{' '}
        {lang === 'ru' ? 'или в WhatsApp.' : 'немесе WhatsApp арқылы.'}
      </div>
    </section>
  )
}
