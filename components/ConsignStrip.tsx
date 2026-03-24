'use client'
import { useLang } from '@/lib/LangContext'
import { t } from '@/lib/translations'
import { useIsMobile } from '@/lib/useIsMobile'

export default function ConsignStrip() {
  const { lang } = useLang()
  const tr = t[lang]
  const isMobile = useIsMobile()

  return (
    <div style={{
      background: '#1A1612',
      padding: isMobile ? '28px 20px' : '36px 80px',
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'space-between',
      alignItems: isMobile ? 'flex-start' : 'center',
      gap: isMobile ? '20px' : '40px',
    }}>
      <div>
        <div style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: '#B8962E', marginBottom: '8px', fontWeight: 400 }}>{tr.consign_label}</div>
        <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: isMobile ? '22px' : '28px', fontWeight: 300, color: '#fff' }}>
          {tr.consign_title} <em style={{ fontStyle: 'italic', color: '#D4AF57' }}>{tr.consign_title_em}</em>
        </div>
        <div style={{ fontSize: '13px', color: '#666', fontWeight: 300, marginTop: '6px' }}>{tr.consign_desc}</div>
      </div>
      <a href="/consign" style={{
        background: '#B8962E', color: '#fff', fontSize: '10px', letterSpacing: '3px',
        textTransform: 'uppercase', padding: '13px 36px', fontFamily: '"Jost", sans-serif',
        fontWeight: 400, textDecoration: 'none', whiteSpace: 'nowrap',
        alignSelf: isMobile ? 'stretch' : 'auto', textAlign: 'center',
      }}>
        {tr.consign_btn}
      </a>
    </div>
  )
}
