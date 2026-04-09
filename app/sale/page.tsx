'use client'
import { useEffect, useState } from 'react'
import { supabase, Product, getPhotosByCategory } from '@/lib/supabase'
import { getConditionStyle, getCategoryForProduct, getProductImage } from '@/lib/productImages'
import { useLang } from '@/lib/LangContext'
import { t } from '@/lib/translations'
import { useIsMobile } from '@/lib/useIsMobile'
import { useFavorites } from '@/lib/FavoritesContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function SalePage() {
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
        .from('products')
        .select('*')
        .eq('is_active', true)
        .eq('source_type', 'own')
        .order('open_date', { ascending: false })

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

  const hasProducts = products.length > 0

  return (
    <>
      <Header />
      <div style={{ background: '#F7F4EF', minHeight: '100vh' }}>

        {/* HERO */}
        <div style={{ background: '#1A1612', padding: isMobile ? '40px 20px' : '56px 80px' }}>
          <div style={{ fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: '#B8962E', marginBottom: '10px' }}>
            {lang === 'ru' ? 'АКЦИИ И СКИДКИ' : 'АКЦИЯЛАР МЕН ЖЕҢІЛДІКТЕР'}
          </div>
          <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: isMobile ? '32px' : '48px', fontWeight: 300, color: '#fff', margin: '0 0 12px', lineHeight: 1.1 }}>
            {lang === 'ru' ? 'Специальные ' : 'Арнайы '}
            <em style={{ fontStyle: 'italic', color: '#B8962E' }}>
              {lang === 'ru' ? 'предложения' : 'ұсыныстар'}
            </em>
          </h1>
          {hasProducts && (
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', fontWeight: 300, margin: 0 }}>
              {lang === 'ru'
                ? `${products.length} изделий нашего магазина по специальным ценам`
                : `Дүкеніміздің ${products.length} бұйымы арнайы бағамен`}
            </p>
          )}
        </div>

        {/* КОНТЕНТ */}
        <div style={{ padding: isMobile ? '24px 16px' : '48px 80px' }}>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '80px', fontFamily: '"Cormorant Garamond", serif', fontSize: '24px', color: '#B8962E' }}>
              {lang === 'ru' ? 'Загрузка...' : 'Жүктелуде...'}
            </div>

          ) : !hasProducts ? (
            /* ПУСТОЕ СОСТОЯНИЕ */
            <div>
              <div style={{ textAlign: 'center', padding: isMobile ? '40px 0' : '60px 0' }}>
                <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: isMobile ? '24px' : '32px', fontWeight: 300, color: '#1A1612', marginBottom: '16px' }}>
                  {lang === 'ru' ? 'Здесь будут публиковаться наши сезонные акции' : 'Мұнда маусымдық акциялар жарияланады'}
                </div>
                <p style={{ fontSize: '14px', color: '#888', fontWeight: 300, lineHeight: 1.8, maxWidth: '560px', margin: '0 auto 40px' }}>
                  {lang === 'ru'
                    ? 'Следите за нашими обновлениями и новостями. Мы регулярно проводим сезонные распродажи, акции на отдельные категории товаров и специальные предложения для постоянных покупателей.'
                    : 'Жаңартуларымыз бен жаңалықтарымызды қадағалаңыз. Біз тұрақты маусымдық жеңілдіктер, тауар санаттарына арнайы акциялар және тұрақты сатып алушыларға арнайы ұсыныстар жүргіземіз.'}
                </p>
              </div>

              {/* КАРТОЧКИ INFO */}
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '2px', background: '#E2D9CC', marginBottom: '40px' }}>
                {[
                  { title: lang === 'ru' ? 'СЕЗОННЫЕ СКИДКИ' : 'МАУСЫМДЫҚ ЖЕҢІЛДІКТЕР', desc: lang === 'ru' ? 'Специальные цены на украшения в конце каждого сезона' : 'Әр маусым соңында зергерлік бұйымдарға арнайы бағалар' },
                  { title: lang === 'ru' ? 'АКЦИИ НА КАТЕГОРИИ' : 'САНАТТАРҒА АКЦИЯЛАР', desc: lang === 'ru' ? 'Скидки на отдельные типы украшений и техники' : 'Жекелеген зергерлік бұйымдар мен техника түрлеріне жеңілдіктер' },
                  { title: lang === 'ru' ? 'ПОСТОЯННЫМ КЛИЕНТАМ' : 'ТҰРАҚТЫ КЛИЕНТТЕРГЕ', desc: lang === 'ru' ? 'Особые условия для тех, кто покупает у нас регулярно' : 'Бізден тұрақты сатып алатындарға арнайы шарттар' },
                ].map(card => (
                  <div key={card.title} style={{ background: '#fff', padding: '28px 24px' }}>
                    <div style={{ width: '32px', height: '2px', background: '#B8962E', marginBottom: '16px' }} />
                    <div style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: '#1A1612', fontWeight: 500, marginBottom: '10px' }}>
                      {card.title}
                    </div>
                    <p style={{ fontSize: '13px', color: '#888', fontWeight: 300, lineHeight: 1.7, margin: 0 }}>
                      {card.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div style={{ padding: '20px 24px', background: '#1A1612', display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center', gap: '12px' }}>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', fontWeight: 300 }}>
                  {lang === 'ru'
                    ? 'Подпишитесь на наш Instagram и WhatsApp чтобы первыми узнавать об акциях'
                    : 'Instagram және WhatsApp-та акциялар туралы бірінші болып білу үшін жазылыңыз'}
                </div>
                <a href="https://wa.me/77712707975" target="_blank"
                  style={{ background: '#25D366', color: '#fff', padding: '10px 24px', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', textDecoration: 'none', fontFamily: '"Jost", sans-serif', whiteSpace: 'nowrap' }}>
                  WhatsApp
                </a>
              </div>
            </div>

          ) : (
            /* ТОВАРЫ */
            <div>
              <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: isMobile ? '22px' : '28px', fontWeight: 300, color: '#1A1612' }}>
                  {lang === 'ru' ? 'Специальные и ограниченные предложения нашего магазина' : 'Дүкеніміздің арнайы және шектеулі ұсыныстары'}
                </div>
                <div style={{ fontSize: '11px', color: '#888', letterSpacing: '1px' }}>
                  {products.length} {lang === 'ru' ? 'изделий' : 'бұйым'}
                </div>
              </div>

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
                        <button
                          onClick={() => toggleItem({ id: String(p.id), article: p.article, name: p.name_display, price: p.estimate_sum, proba: p.proba })}
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
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}
