'use client'
import { useState } from 'react'
import { useLang } from '@/lib/LangContext'
import { t } from '@/lib/translations'
import { useIsMobile } from '@/lib/useIsMobile'

export default function Header() {
  const { lang, setLang } = useLang()
  const tr = t[lang]
  const isMobile = useIsMobile()
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { label: tr.nav_home, href: '/' },
    { label: tr.nav_jewelry, href: '/jewelry' },
    { label: tr.nav_tech, href: '/tech' },
    { label: tr.nav_trending, href: '/trending' },
    { label: tr.nav_sale, href: '/sale' },
    { label: tr.nav_consign, href: '/consign' },
  ]

  return (
    <>
      {/* TOP BAR — только десктоп */}
      {!isMobile && (
        <div style={{ background: '#1A1612', padding: '8px 40px', display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '11px', color: '#666', fontWeight: 300, letterSpacing: '1px' }}>
            {tr.topbar_left}
          </span>
          <span style={{ fontSize: '11px', color: '#D4AF57', fontWeight: 300, letterSpacing: '1px' }}>
            +7 771 270 7975 · WhatsApp · @zoloto_karaganda_torgi
          </span>
        </div>
      )}

      <header style={{ background: '#fff', borderBottom: '1px solid #E2D9CC', position: 'sticky', top: 0, zIndex: 100 }}>

        {/* ГЛАВНАЯ СТРОКА */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: isMobile ? '0 16px' : '0 40px', height: isMobile ? '56px' : '68px' }}>

          {/* ЛОГО */}
          <a href="/" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: isMobile ? '20px' : '26px', fontWeight: 600, letterSpacing: '3px', color: '#1A1612', whiteSpace: 'nowrap' }}>
              АКША<span style={{ color: '#B8962E' }}>КОМ</span>
            </span>
            <span style={{ fontSize: '8px', letterSpacing: '3px', textTransform: 'uppercase', color: '#4A4540', fontFamily: '"Jost", sans-serif', fontWeight: 300, marginTop: '2px' }}>
              {tr.topbar_left.split('·')[0].trim()}
            </span>
          </a>

          {/* ПОИСК — только десктоп */}
          {!isMobile && (
            <div style={{ flex: 1, maxWidth: '400px', margin: '0 40px', position: 'relative' }}>
              <svg style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '15px', height: '15px', stroke: '#4A4540', fill: 'none', strokeWidth: 1.5 }} viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <input type="text" placeholder={tr.search_placeholder}
                style={{ width: '100%', padding: '9px 16px 9px 38px', border: '1px solid #E2D9CC', background: '#F7F4EF', fontSize: '13px', fontFamily: '"Jost", sans-serif', fontWeight: 300, color: '#1A1612', outline: 'none' }} />
            </div>
          )}

          {/* ПРАВАЯ ЧАСТЬ */}
          <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '8px' : '16px' }}>

            {/* ПЕРЕКЛЮЧАТЕЛЬ ЯЗЫКА */}
            <div style={{ display: 'flex' }}>
              {(['ru', 'kz'] as const).map((l, i) => (
                <button key={l} onClick={() => setLang(l)}
                  style={{
                    padding: isMobile ? '4px 8px' : '5px 12px',
                    fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase',
                    background: lang === l ? '#1A1612' : 'transparent',
                    color: lang === l ? '#B8962E' : '#888',
                    border: '1px solid #E2D9CC',
                    borderRight: i === 0 ? 'none' : '1px solid #E2D9CC',
                    cursor: 'pointer', fontFamily: '"Jost", sans-serif',
                    fontWeight: lang === l ? 500 : 300,
                  }}>
                  {l === 'ru' ? 'РУ' : 'ҚАЗ'}
                </button>
              ))}
            </div>

            {/* ИКОНКИ — только десктоп */}
            {!isMobile && (
              <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', color: '#4A4540', fontSize: '11px', fontFamily: '"Jost", sans-serif', fontWeight: 300, letterSpacing: '1px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                  </svg>
                  {tr.login}
                </button>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', color: '#4A4540', fontSize: '11px', fontFamily: '"Jost", sans-serif', fontWeight: 300, letterSpacing: '1px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  {tr.favorites}
                </button>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', color: '#4A4540', fontSize: '11px', fontFamily: '"Jost", sans-serif', fontWeight: 300, letterSpacing: '1px', position: 'relative' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                  {tr.cart}
                  <span style={{ position: 'absolute', top: '-4px', right: '-4px', background: '#B8962E', color: '#fff', fontSize: '9px', width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 500 }}>0</span>
                </button>
              </div>
            )}

            {/* КОРЗИНА — только мобильный */}
            {isMobile && (
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#4A4540', position: 'relative' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                <span style={{ position: 'absolute', top: '-4px', right: '-4px', background: '#B8962E', color: '#fff', fontSize: '9px', width: '15px', height: '15px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 500 }}>0</span>
              </button>
            )}

            {/* БУРГЕР — только мобильный */}
            {isMobile && (
              <button onClick={() => setMenuOpen(!menuOpen)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', display: 'flex', flexDirection: 'column', gap: '5px', justifyContent: 'center', alignItems: 'center', width: '36px', height: '36px' }}>
                <span style={{ display: 'block', width: '22px', height: '2px', background: '#1A1612', borderRadius: '2px', transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none' }} />
                <span style={{ display: 'block', width: '22px', height: '2px', background: '#1A1612', borderRadius: '2px', transition: 'all 0.3s', opacity: menuOpen ? 0 : 1 }} />
                <span style={{ display: 'block', width: '22px', height: '2px', background: '#1A1612', borderRadius: '2px', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
              </button>
            )}
          </div>
        </div>

        {/* ПОИСК НА МОБИЛЬНОМ */}
        {isMobile && (
          <div style={{ padding: '8px 16px 10px', borderTop: '1px solid #E2D9CC' }}>
            <div style={{ position: 'relative' }}>
              <svg style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', width: '14px', height: '14px', stroke: '#4A4540', fill: 'none', strokeWidth: 1.5 }} viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <input type="text" placeholder={tr.search_placeholder}
                style={{ width: '100%', padding: '8px 12px 8px 32px', border: '1px solid #E2D9CC', background: '#F7F4EF', fontSize: '13px', fontFamily: '"Jost", sans-serif', fontWeight: 300, color: '#1A1612', outline: 'none' }} />
            </div>
          </div>
        )}

        {/* NAV — только десктоп */}
        {!isMobile && (
          <nav style={{ borderTop: '1px solid #E2D9CC', display: 'flex', justifyContent: 'center' }}>
            {navItems.map((item) => (
              <a key={item.href} href={item.href} style={{ display: 'block', padding: '13px 20px', fontSize: '11px', fontWeight: 400, letterSpacing: '2px', textTransform: 'uppercase', textDecoration: 'none', color: '#4A4540', borderBottom: '2px solid transparent', transition: 'all .2s', whiteSpace: 'nowrap' }}>
                {item.label}
              </a>
            ))}
          </nav>
        )}

        {/* МОБИЛЬНОЕ МЕНЮ */}
        {isMobile && (
          <div style={{ maxHeight: menuOpen ? '400px' : '0', overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
            <nav style={{ borderTop: '1px solid #E2D9CC', display: 'flex', flexDirection: 'column', background: '#fff' }}>
              {navItems.map((item) => (
                <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}
                  style={{ padding: '14px 20px', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', textDecoration: 'none', color: '#4A4540', borderBottom: '1px solid #F0EDE8', fontFamily: '"Jost", sans-serif' }}>
                  {item.label}
                </a>
              ))}
              <div style={{ padding: '14px 20px', background: '#1A1612' }}>
                <div style={{ fontSize: '11px', color: '#D4AF57', letterSpacing: '1px', fontWeight: 300 }}>+7 771 270 7975</div>
                <div style={{ fontSize: '10px', color: '#555', letterSpacing: '1px', fontWeight: 300, marginTop: '4px' }}>WhatsApp · @zoloto_karaganda_torgi</div>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}
