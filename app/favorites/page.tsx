'use client'
import { useFavorites } from '@/lib/FavoritesContext'
import { useCart } from '@/lib/CartContext'
import { useLang } from '@/lib/LangContext'
import { useIsMobile } from '@/lib/useIsMobile'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function FavoritesPage() {
  const { items, removeItem } = useFavorites()
  const { addItem, items: cartItems } = useCart()
  const { lang } = useLang()
  const isMobile = useIsMobile()

  const tr = {
    ru: {
      title: 'Избранное',
      empty: 'Список избранного пуст',
      emptyDesc: 'Добавляйте понравившиеся украшения, нажимая на ♡',
      toCatalog: 'Перейти в каталог →',
      article: 'Арт.',
      remove: 'Удалить',
      addToCart: 'В корзину',
      inCart: '✓ В корзине',
      toCart: 'Перейти в корзину →',
    },
    kz: {
      title: 'Таңдаулы',
      empty: 'Таңдаулы тізім бос',
      emptyDesc: '♡ басу арқылы ұнаған бұйымдарды қосыңыз',
      toCatalog: 'Каталогқа өту →',
      article: 'Арт.',
      remove: 'Жою',
      addToCart: 'Себетке',
      inCart: '✓ Себетте',
      toCart: 'Себетке өту →',
    }
  }[lang]

  return (
    <>
      <Header />
      <div style={{ background: '#F7F4EF', minHeight: '100vh', padding: isMobile ? '24px 16px' : '48px 80px' }}>

        <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: isMobile ? '28px' : '42px', fontWeight: 300, color: '#1A1612', marginBottom: '32px' }}>
          {tr.title}
        </div>

        {items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px' }}>
            <div style={{ fontSize: '48px', marginBottom: '20px', opacity: 0.3 }}>♡</div>
            <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '28px', fontWeight: 300, color: '#1A1612', marginBottom: '12px' }}>{tr.empty}</div>
            <p style={{ fontSize: '14px', color: '#4A4540', fontWeight: 300, marginBottom: '32px' }}>{tr.emptyDesc}</p>
            <a href="/jewelry" style={{ background: '#1A1612', color: '#fff', padding: '14px 40px', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', textDecoration: 'none', fontFamily: '"Jost", sans-serif' }}>
              {tr.toCatalog}
            </a>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '2px', background: '#E2D9CC' }}>
            {items.map(item => {
              const inCart = cartItems.some(i => i.id === item.id)
              return (
                <div key={item.id} style={{ background: '#fff', padding: '20px' }}>
                  <div style={{ fontSize: '10px', color: '#B8962E', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '4px' }}>
                    {tr.article} {item.article} · {item.proba}°
                  </div>
                  <a href={`/jewelry/${item.id}`} style={{ textDecoration: 'none' }}>
                    <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '20px', fontWeight: 400, color: '#1A1612', marginBottom: '8px', lineHeight: 1.2 }}>
                      {item.name}
                    </div>
                  </a>
                  <div style={{ fontSize: '18px', fontWeight: 500, color: '#1A1612', marginBottom: '16px' }}>
                    {item.price.toLocaleString('ru-RU')} ₸
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => {
                        if (!inCart) addItem({ id: item.id, article: item.article, name: item.name, price: item.price, proba: item.proba })
                      }}
                      style={{
                        flex: 1, padding: '10px', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase',
                        background: inCart ? '#4A4540' : '#1A1612', color: '#fff', border: 'none',
                        cursor: inCart ? 'default' : 'pointer', fontFamily: '"Jost", sans-serif',
                      }}>
                      {inCart ? tr.inCart : tr.addToCart}
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      style={{ padding: '10px 14px', background: 'transparent', border: '1px solid #E2D9CC', cursor: 'pointer', color: '#888', fontSize: '11px', fontFamily: '"Jost", sans-serif' }}>
                      ✕
                    </button>
                  </div>
                  {inCart && (
                    <a href="/cart" style={{ display: 'block', textAlign: 'center', marginTop: '8px', fontSize: '11px', color: '#B8962E', textDecoration: 'none', letterSpacing: '1px' }}>
                      {tr.toCart}
                    </a>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}
