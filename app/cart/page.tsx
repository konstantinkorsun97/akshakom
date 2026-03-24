'use client'
import { useState } from 'react'
import { useCart } from '@/lib/CartContext'
import { useLang } from '@/lib/LangContext'
import { useIsMobile } from '@/lib/useIsMobile'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function CartPage() {
  const { items, removeItem, clearCart, totalPrice } = useCart()
  const { lang } = useLang()
  const isMobile = useIsMobile()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [sent, setSent] = useState(false)

  const tr = {
    ru: {
      title: 'Корзина',
      empty: 'Корзина пуста',
      emptyDesc: 'Добавьте украшения из каталога',
      toCatalog: 'Перейти в каталог →',
      article: 'Арт.',
      remove: 'Удалить',
      total: 'Итого',
      items: 'позиций',
      orderTitle: 'Оформить заказ',
      orderDesc: 'Мы свяжемся с вами для подтверждения и скажем адрес магазина',
      namePlaceholder: 'Ваше имя',
      phonePlaceholder: 'Номер телефона',
      submit: 'Отправить заявку в WhatsApp',
      sentTitle: 'Заявка отправлена!',
      sentDesc: 'Мы откроем WhatsApp с вашим заказом. Ожидайте звонка.',
      sentBtn: 'Вернуться в каталог',
    },
    kz: {
      title: 'Себет',
      empty: 'Себет бос',
      emptyDesc: 'Каталогтан бұйымдар қосыңыз',
      toCatalog: 'Каталогқа өту →',
      article: 'Арт.',
      remove: 'Жою',
      total: 'Барлығы',
      items: 'бұйым',
      orderTitle: 'Тапсырыс рәсімдеу',
      orderDesc: 'Растау үшін сізге хабарласып, дүкен мекенжайын айтамыз',
      namePlaceholder: 'Атыңыз',
      phonePlaceholder: 'Телефон нөмірі',
      submit: 'WhatsApp-қа өтінім жіберу',
      sentTitle: 'Өтінім жіберілді!',
      sentDesc: 'WhatsApp-та тапсырысыңызды ашамыз. Қоңырауды күтіңіз.',
      sentBtn: 'Каталогқа оралу',
    }
  }[lang]

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name || !phone) return

    const itemsList = items.map(i =>
      `• ${i.name} (Арт. ${i.article}) — ${i.price.toLocaleString('ru-RU')} ₸`
    ).join('\n')

    const message = encodeURIComponent(
      `Здравствуйте! Хочу оформить заказ:\n\n${itemsList}\n\nИтого: ${totalPrice.toLocaleString('ru-RU')} ₸\n\nИмя: ${name}\nТелефон: ${phone}`
    )

    window.open(`https://wa.me/77712707975?text=${message}`, '_blank')
    setSent(true)
    clearCart()
  }

  if (sent) {
    return (
      <>
        <Header />
        <div style={{ background: '#F7F4EF', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
          <div style={{ textAlign: 'center', maxWidth: '480px' }}>
            <div style={{ fontSize: '48px', marginBottom: '24px' }}>✓</div>
            <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '32px', fontWeight: 300, color: '#1A1612', marginBottom: '12px' }}>{tr.sentTitle}</div>
            <p style={{ fontSize: '14px', color: '#4A4540', fontWeight: 300, lineHeight: 1.8, marginBottom: '32px' }}>{tr.sentDesc}</p>
            <a href="/jewelry" style={{ background: '#1A1612', color: '#fff', padding: '14px 40px', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', textDecoration: 'none', fontFamily: '"Jost", sans-serif' }}>
              {tr.sentBtn}
            </a>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <div style={{ background: '#F7F4EF', minHeight: '100vh', padding: isMobile ? '24px 16px' : '48px 80px' }}>

        <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: isMobile ? '28px' : '42px', fontWeight: 300, color: '#1A1612', marginBottom: '32px' }}>
          {tr.title}
        </div>

        {items.length === 0 ? (
          /* ПУСТАЯ КОРЗИНА */
          <div style={{ textAlign: 'center', padding: '80px 20px' }}>
            <div style={{ fontSize: '48px', marginBottom: '20px', opacity: 0.3 }}>🛒</div>
            <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '28px', fontWeight: 300, color: '#1A1612', marginBottom: '12px' }}>{tr.empty}</div>
            <p style={{ fontSize: '14px', color: '#4A4540', fontWeight: 300, marginBottom: '32px' }}>{tr.emptyDesc}</p>
            <a href="/jewelry" style={{ background: '#1A1612', color: '#fff', padding: '14px 40px', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', textDecoration: 'none', fontFamily: '"Jost", sans-serif' }}>
              {tr.toCatalog}
            </a>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 400px', gap: '32px', alignItems: 'start' }}>

            {/* СПИСОК ТОВАРОВ */}
            <div>
              <div style={{ border: '1px solid #E2D9CC', background: '#fff' }}>
                {items.map((item, i) => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: i < items.length - 1 ? '1px solid #E2D9CC' : 'none', gap: '16px' }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '10px', color: '#B8962E', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '3px' }}>{tr.article} {item.article} · {item.proba}°</div>
                      <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '17px', fontWeight: 400, color: '#1A1612', marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</div>
                      <div style={{ fontSize: '15px', fontWeight: 500, color: '#1A1612' }}>{item.price.toLocaleString('ru-RU')} ₸</div>
                    </div>
                    <button onClick={() => removeItem(item.id)}
                      style={{ background: 'none', border: '1px solid #E2D9CC', cursor: 'pointer', color: '#888', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', padding: '6px 12px', fontFamily: '"Jost", sans-serif', whiteSpace: 'nowrap', flexShrink: 0 }}>
                      {tr.remove}
                    </button>
                  </div>
                ))}
              </div>

              {/* ИТОГО */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', background: '#1A1612', marginTop: '2px' }}>
                <div style={{ fontSize: '12px', color: '#888', letterSpacing: '2px', textTransform: 'uppercase', fontFamily: '"Jost", sans-serif' }}>
                  {tr.total} · {items.length} {tr.items}
                </div>
                <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '24px', fontWeight: 400, color: '#fff' }}>
                  {totalPrice.toLocaleString('ru-RU')} ₸
                </div>
              </div>
            </div>

            {/* ФОРМА ЗАКАЗА */}
            <div style={{ background: '#fff', border: '1px solid #E2D9CC', padding: '28px 24px' }}>
              <div style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: '#B8962E', marginBottom: '8px', fontFamily: '"Jost", sans-serif' }}>
                {tr.orderTitle}
              </div>
              <p style={{ fontSize: '13px', color: '#4A4540', fontWeight: 300, lineHeight: 1.7, marginBottom: '24px' }}>
                {tr.orderDesc}
              </p>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder={tr.namePlaceholder}
                  required
                  style={{ width: '100%', padding: '12px 16px', border: '1px solid #E2D9CC', background: '#F7F4EF', fontSize: '13px', fontFamily: '"Jost", sans-serif', outline: 'none', marginBottom: '12px', boxSizing: 'border-box' }}
                />
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder={tr.phonePlaceholder}
                  required
                  style={{ width: '100%', padding: '12px 16px', border: '1px solid #E2D9CC', background: '#F7F4EF', fontSize: '13px', fontFamily: '"Jost", sans-serif', outline: 'none', marginBottom: '20px', boxSizing: 'border-box' }}
                />
                <button type="submit"
                  style={{ width: '100%', background: '#25D366', color: '#fff', border: 'none', padding: '14px', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer', fontFamily: '"Jost", sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  {tr.submit}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}
