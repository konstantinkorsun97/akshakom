'use client'
import { useLang } from '@/lib/LangContext'
import { t } from '@/lib/translations'
import { useIsMobile } from '@/lib/useIsMobile'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function ConsignPage() {
  const { lang } = useLang()
  const tr = t[lang]
  const isMobile = useIsMobile()

  return (
    <>
      <Header />
      <div style={{ background: '#F7F4EF', minHeight: '100vh' }}>

        {/* HERO */}
        <div style={{ background: '#1A1612', padding: isMobile ? '40px 20px' : '64px 80px' }}>
          <div style={{ fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: '#B8962E', marginBottom: '16px', fontWeight: 400 }}>{tr.consign_page_label}</div>
          <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: isMobile ? '32px' : '48px', fontWeight: 300, color: '#fff', marginBottom: '16px', lineHeight: 1.2 }}>
            {tr.consign_page_title}<br /><em style={{ fontStyle: 'italic', color: '#D4AF57' }}>{tr.consign_page_title_em}</em>
          </h1>
          <p style={{ fontSize: '13px', color: '#777', fontWeight: 300, lineHeight: 1.8, maxWidth: '560px', margin: 0 }}>
            {tr.consign_page_desc}
          </p>
        </div>

        {/* ДЛЯ ПОКУПАТЕЛЕЙ */}
        <div style={{ padding: isMobile ? '32px 20px' : '64px 80px', borderBottom: '1px solid #E2D9CC' }}>
          <div style={{ fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: '#B8962E', marginBottom: '12px', fontWeight: 400 }}>{tr.consign_buyers_label}</div>
          <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: isMobile ? '26px' : '36px', fontWeight: 300, color: '#1A1612', marginBottom: '28px' }}>{tr.consign_buyers_title}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4,1fr)', gap: '2px', background: '#E2D9CC' }}>
            {tr.consign_buyers_steps.map(item => (
              <div key={item.num} style={{ background: '#fff', padding: isMobile ? '20px 16px' : '36px 28px' }}>
                <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: isMobile ? '32px' : '48px', fontWeight: 300, color: '#E2D9CC', lineHeight: 1, marginBottom: '12px' }}>{item.num}</div>
                <div style={{ fontSize: '12px', fontWeight: 500, letterSpacing: '1px', textTransform: 'uppercase', color: '#1A1612', marginBottom: '8px' }}>{item.title}</div>
                <div style={{ fontSize: '12px', color: '#4A4540', fontWeight: 300, lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ДЛЯ ПРОДАВЦОВ */}
        <div style={{ padding: isMobile ? '32px 20px' : '64px 80px', borderBottom: '1px solid #E2D9CC', background: '#fff' }}>
          <div style={{ fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: '#B8962E', marginBottom: '12px', fontWeight: 400 }}>{tr.consign_sellers_label}</div>
          <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: isMobile ? '26px' : '36px', fontWeight: 300, color: '#1A1612', marginBottom: '28px' }}>{tr.consign_sellers_title}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4,1fr)', gap: '2px', background: '#E2D9CC' }}>
            {tr.consign_sellers_steps.map(item => (
              <div key={item.num} style={{ background: '#F7F4EF', padding: isMobile ? '20px 16px' : '36px 28px' }}>
                <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: isMobile ? '32px' : '48px', fontWeight: 300, color: '#E2D9CC', lineHeight: 1, marginBottom: '12px' }}>{item.num}</div>
                <div style={{ fontSize: '12px', fontWeight: 500, letterSpacing: '1px', textTransform: 'uppercase', color: '#1A1612', marginBottom: '8px' }}>{item.title}</div>
                <div style={{ fontSize: '12px', color: '#4A4540', fontWeight: 300, lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* УСЛОВИЯ */}
        <div style={{ padding: isMobile ? '32px 20px' : '64px 80px', borderBottom: '1px solid #E2D9CC' }}>
          <div style={{ fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: '#B8962E', marginBottom: '12px', fontWeight: 400 }}>{tr.consign_accept_label}</div>
          <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: isMobile ? '26px' : '36px', fontWeight: 300, color: '#1A1612', marginBottom: '28px' }}>{tr.consign_accept_title}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '28px' : '40px' }}>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 500, letterSpacing: '1px', textTransform: 'uppercase', color: '#1A1612', marginBottom: '16px', paddingBottom: '10px', borderBottom: '1px solid #E2D9CC' }}>{tr.consign_gold_title}</div>
              {tr.consign_gold_items.map(item => (
                <div key={item} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#B8962E', flexShrink: 0, marginTop: '5px' }} />
                  <div style={{ fontSize: '13px', color: '#4A4540', fontWeight: 300 }}>{item}</div>
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 500, letterSpacing: '1px', textTransform: 'uppercase', color: '#1A1612', marginBottom: '16px', paddingBottom: '10px', borderBottom: '1px solid #E2D9CC' }}>{tr.consign_tech_title}</div>
              {tr.consign_tech_items.map(item => (
                <div key={item} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#B8962E', flexShrink: 0, marginTop: '5px' }} />
                  <div style={{ fontSize: '13px', color: '#4A4540', fontWeight: 300 }}>{item}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: '#1A1612', padding: isMobile ? '36px 20px' : '64px 80px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center', gap: '24px' }}>
          <div>
            <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: isMobile ? '26px' : '36px', fontWeight: 300, color: '#fff', marginBottom: '8px' }}>
              {tr.consign_cta_title} <em style={{ fontStyle: 'italic', color: '#D4AF57' }}>{tr.consign_cta_title_em}</em>
            </div>
            <div style={{ fontSize: '13px', color: '#666', fontWeight: 300 }}>{tr.consign_cta_desc}</div>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexShrink: 0, flexDirection: isMobile ? 'column' : 'row', width: isMobile ? '100%' : 'auto' }}>
            <a href="tel:+77000513007" style={{ background: '#B8962E', color: '#fff', padding: '14px 32px', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', textDecoration: 'none', fontFamily: '"Jost", sans-serif', textAlign: 'center' }}>
              {tr.consign_cta_call}
            </a>
            <a href="https://wa.me/77000513007" style={{ border: '1px solid #2A2520', color: '#888', padding: '14px 32px', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', textDecoration: 'none', fontFamily: '"Jost", sans-serif', textAlign: 'center' }}>
              {tr.consign_cta_whatsapp}
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
