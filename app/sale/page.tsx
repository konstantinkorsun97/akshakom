'use client'
import { useLang } from '@/lib/LangContext'
import { t } from '@/lib/translations'
import { useIsMobile } from '@/lib/useIsMobile'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function SalePage() {
  const { lang } = useLang()
  const tr = t[lang]
  const isMobile = useIsMobile()

  return (
    <>
      <Header />
      <div style={{ background: '#F7F4EF', minHeight: '80vh' }}>
        <div style={{ background: '#1A1612', padding: isMobile ? '40px 20px' : '64px 80px' }}>
          <div style={{ fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: '#B8962E', marginBottom: '16px', fontWeight: 400 }}>{tr.sale_label}</div>
          <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: isMobile ? '32px' : '48px', fontWeight: 300, color: '#fff', margin: 0 }}>
            {tr.sale_title} <em style={{ fontStyle: 'italic', color: '#D4AF57' }}>{tr.sale_title_em}</em>
          </h1>
        </div>
        <div style={{ padding: isMobile ? '40px 20px' : '80px', textAlign: 'center', maxWidth: '680px', margin: '0 auto' }}>
          <div style={{ width: '64px', height: '64px', border: '1px solid #E2D9CC', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px', fontSize: '24px' }}>🏷</div>
          <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: isMobile ? '24px' : '32px', fontWeight: 300, color: '#1A1612', marginBottom: '16px', lineHeight: 1.3 }}>
            {tr.sale_coming_title}
          </div>
          <p style={{ fontSize: '14px', color: '#4A4540', fontWeight: 300, lineHeight: 1.8, marginBottom: '32px' }}>
            {tr.sale_coming_desc}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: '2px', background: '#E2D9CC', marginBottom: '32px' }}>
            {tr.sale_cards.map(item => (
              <div key={item.title} style={{ background: '#fff', padding: isMobile ? '24px 20px' : '32px 24px', textAlign: 'left' }}>
                <div style={{ width: '32px', height: '2px', background: '#B8962E', marginBottom: '14px' }} />
                <div style={{ fontSize: '13px', fontWeight: 500, letterSpacing: '1px', textTransform: 'uppercase', color: '#1A1612', marginBottom: '8px' }}>{item.title}</div>
                <div style={{ fontSize: '13px', color: '#4A4540', fontWeight: 300, lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ padding: '16px 24px', background: '#F0EDE8', border: '1px solid #E2D9CC', fontSize: '13px', color: '#4A4540', fontWeight: 300 }}>
            {tr.sale_subscribe}{' '}
            <span style={{ color: '#B8962E', fontWeight: 400 }}>Instagram</span>{' '}
            {tr.sale_subscribe_and}{' '}
            <span style={{ color: '#B8962E', fontWeight: 400 }}>WhatsApp</span>{' '}
            {tr.sale_subscribe2}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
