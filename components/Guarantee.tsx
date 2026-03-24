'use client'
import { useLang } from '@/lib/LangContext'
import { t } from '@/lib/translations'
import { useIsMobile } from '@/lib/useIsMobile'

export default function Guarantee() {
  const { lang } = useLang()
  const tr = t[lang]
  const isMobile = useIsMobile()

  const items = [
    {
      icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#B8962E" strokeWidth="1.2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
      title: tr.g1_title, desc: tr.g1_desc,
    },
    {
      icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#B8962E" strokeWidth="1.2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>,
      title: tr.g2_title, desc: tr.g2_desc,
    },
    {
      icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#B8962E" strokeWidth="1.2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
      title: tr.g3_title, desc: tr.g3_desc,
    },
    {
      icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#B8962E" strokeWidth="1.2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
      title: tr.g4_title, desc: tr.g4_desc,
    },
  ]

  return (
    <div style={{
      background: isMobile ? '#E2D9CC' : '#fff',
      padding: isMobile ? '1px' : '0',
      display: 'grid',
      gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
      borderTop: '1px solid #E2D9CC',
      borderBottom: '1px solid #E2D9CC',
    }}>
      {items.map((item, i) => (
        <div key={i} style={{
          padding: isMobile ? '16px 14px' : '16px 24px',
          borderRight: !isMobile && i < 3 ? '1px solid #E2D9CC' : 'none',
          textAlign: 'center',
          background: '#fff',
        }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>{item.icon}</div>
          <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '1px', textTransform: 'uppercase', color: '#1A1612', marginBottom: '4px' }}>{item.title}</div>
          <div style={{ fontSize: isMobile ? '11px' : '12px', color: '#4A4540', fontWeight: 300, lineHeight: 1.5 }}>{item.desc}</div>
        </div>
      ))}
    </div>
  )
}
