'use client'
import { useLang } from '@/lib/LangContext'
import { t } from '@/lib/translations'

export default function Footer() {
  const { lang } = useLang()
  const tr = t[lang]

  const buyerLinks = lang === 'ru'
    ? ['Как купить', 'Состояние товаров', 'Доставка и оплата', 'Возврат товара']
    : ['Қалай сатып алу керек', 'Тауар жай-күйі', 'Жеткізу және төлем', 'Тауарды қайтару']

  const sellerLinks = lang === 'ru'
    ? ['Сдать на комиссию', 'Условия комиссии', 'Оценка изделий', 'Пробы золота']
    : ['Комиссияға тапсыру', 'Комиссия шарттары', 'Бұйымдарды бағалау', 'Алтын сынамалары']

  return (
    <footer style={{background:'#111', padding:'48px 40px 24px'}}>
      <div style={{display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', gap:'48px', marginBottom:'40px'}}>

        <div>
          <div style={{fontFamily:'"Cormorant Garamond", serif', fontSize:'22px', fontWeight:600, letterSpacing:'3px', color:'#fff', marginBottom:'2px'}}>
            АКША<span style={{color:'#B8962E'}}>КОМ</span>
          </div>
          <div style={{fontSize:'9px', letterSpacing:'3px', textTransform:'uppercase', color:'#333', fontFamily:'"Jost", sans-serif', fontWeight:300, marginBottom:'14px'}}>
            {lang === 'ru' ? 'Комиссионный магазин' : 'Комиссиялық дүкен'}
          </div>
          <div style={{fontSize:'13px', color:'#444', fontWeight:300, lineHeight:1.7, maxWidth:'240px'}}>
            {tr.footer_desc}
          </div>
        </div>

        <div>
          <div style={{fontSize:'10px', letterSpacing:'3px', textTransform:'uppercase', color:'#B8962E', marginBottom:'12px', fontWeight:400}}>{tr.footer_for_buyers}</div>
          {buyerLinks.map((link) => (
            <div key={link} style={{marginBottom:'8px'}}>
              <a href="/consign" style={{fontSize:'13px', color:'#555', textDecoration:'none', fontWeight:300}}>{link}</a>
            </div>
          ))}
        </div>

        <div>
          <div style={{fontSize:'10px', letterSpacing:'3px', textTransform:'uppercase', color:'#B8962E', marginBottom:'12px', fontWeight:400}}>{tr.footer_for_sellers}</div>
          {sellerLinks.map((link) => (
            <div key={link} style={{marginBottom:'8px'}}>
              <a href="/consign" style={{fontSize:'13px', color:'#555', textDecoration:'none', fontWeight:300}}>{link}</a>
            </div>
          ))}
        </div>

        <div>
          <div style={{fontSize:'10px', letterSpacing:'3px', textTransform:'uppercase', color:'#B8962E', marginBottom:'12px', fontWeight:400}}>{tr.footer_contacts}</div>
          {[
            '+7 771 270 7975',
            'WhatsApp',
            'Instagram · @zoloto_karaganda_torgi',
            lang === 'ru' ? 'г. Карагандa' : 'Қарағанды қ.',
          ].map((link) => (
            <div key={link} style={{marginBottom:'8px'}}>
              <a href="#" style={{fontSize:'13px', color:'#555', textDecoration:'none', fontWeight:300}}>{link}</a>
            </div>
          ))}
        </div>

      </div>

      <div style={{borderTop:'1px solid #1A1A1A', paddingTop:'20px', display:'flex', justifyContent:'space-between'}}>
        <div style={{fontSize:'11px', color:'#2A2A2A', fontWeight:300}}>{tr.footer_copy}</div>
        <div style={{fontSize:'11px', color:'#222', fontWeight:300, letterSpacing:'1px'}}>Алтын · 375° · 500° · 585° · 750° · 999°</div>
      </div>
    </footer>
  )
}