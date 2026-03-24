'use client'
import { useLang } from '@/lib/LangContext'
import { t } from '@/lib/translations'
import { useIsMobile } from '@/lib/useIsMobile'

export default function TechSection() {
  const { lang } = useLang()
  const tr = t[lang]
  const isMobile = useIsMobile()

  const categories = lang === 'ru'
    ? [{ icon: '📱', label: 'Смартфоны' }, { icon: '💻', label: 'Ноутбуки' }, { icon: '⌚', label: 'Умные часы' }, { icon: '🎧', label: 'Аксессуары' }]
    : [{ icon: '📱', label: 'Смартфондар' }, { icon: '💻', label: 'Ноутбуктер' }, { icon: '⌚', label: 'Смарт сағаттар' }, { icon: '🎧', label: 'Аксессуарлар' }]

  const features = lang === 'ru'
    ? [
        { title: 'Честное описание', desc: 'Все дефекты и особенности техники будут подробно описаны' },
        { title: 'Проверенные устройства', desc: 'Каждое устройство проходит проверку перед размещением' },
        { title: 'Выгодные цены', desc: 'Комиссионные цены — значительно ниже рыночных' },
        { title: 'Только самовывоз', desc: 'Личная проверка перед покупкой в нашем магазине' },
      ]
    : [
        { title: 'Адал сипаттама', desc: 'Техниканың барлық ақаулары мен ерекшеліктері толық сипатталады' },
        { title: 'Тексерілген құрылғылар', desc: 'Әрбір құрылғы орналастырылмас бұрын тексеруден өтеді' },
        { title: 'Тиімді бағалар', desc: 'Комиссиялық бағалар — нарықтан әлдеқайда төмен' },
        { title: 'Тек өзіңіз алып кету', desc: 'Сатып алу алдында дүкенімізде жеке тексеру' },
      ]

  return (
    <section style={{ padding: isMobile ? '24px 16px 32px' : '48px 40px 56px', background: '#F7F4EF' }}>
      <div style={{ height: '1px', background: '#E2D9CC', marginBottom: isMobile ? '24px' : '48px' }} />

      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: '#B8962E', fontWeight: 400, marginBottom: '6px' }}>{tr.tech_section_label}</div>
        <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: isMobile ? '26px' : '34px', fontWeight: 300, color: '#1A1612', lineHeight: 1.1 }}>
          {tr.tech_section_title} <em style={{ fontStyle: 'italic', color: '#4A4540' }}>{tr.tech_section_title_em}</em>
        </div>
      </div>

      <div style={{
        background: '#1A1612',
        padding: isMobile ? '28px 20px' : '64px 48px',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: isMobile ? '28px' : '64px',
        alignItems: 'center',
      }}>
        {/* LEFT */}
        <div>
          <div style={{ fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: '#B8962E', marginBottom: '16px', fontWeight: 400 }}>
            {lang === 'ru' ? 'Раздел в разработке' : 'Бөлім әзірленуде'}
          </div>
          <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: isMobile ? '28px' : '40px', fontWeight: 300, color: '#fff', lineHeight: 1.2, marginBottom: '16px' }}>
            {lang === 'ru'
              ? <>Смартфоны, ноутбуки<br />и <em style={{ fontStyle: 'italic', color: '#D4AF57' }}>аксессуары</em></>
              : <>Смартфондар, ноутбуктер<br />және <em style={{ fontStyle: 'italic', color: '#D4AF57' }}>аксессуарлар</em></>}
          </div>
          <p style={{ fontSize: '13px', color: '#888', fontWeight: 300, lineHeight: 1.8, marginBottom: '24px' }}>
            {lang === 'ru'
              ? 'Совсем скоро в нашем комиссионном магазине появится раздел электронной техники. Смартфоны, ноутбуки, планшеты, умные часы и аксессуары — всё с честным описанием состояния и по выгодным ценам.'
              : 'Жақын арада біздің комиссиялық дүкенімізде электронды техника бөлімі пайда болады. Смартфондар, ноутбуктер, планшеттер, смарт сағаттар және аксессуарлар — барлығы жай-күйінің адал сипаттамасымен және тиімді бағамен.'}
          </p>
          <div style={{ display: 'flex', gap: isMobile ? '20px' : '32px', marginBottom: '24px', flexWrap: 'wrap' }}>
            {categories.map(item => (
              <div key={item.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: isMobile ? '22px' : '28px', marginBottom: '6px', opacity: .5 }}>{item.icon}</div>
                <div style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: '#555', fontWeight: 300 }}>{item.label}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '40px', height: '1px', background: '#B8962E' }} />
            <span style={{ fontSize: '12px', color: '#666', fontWeight: 300, letterSpacing: '1px' }}>
              {lang === 'ru' ? 'Следите за обновлениями' : 'Жаңартуларды қадағалаңыз'}
            </span>
          </div>
        </div>

        {/* RIGHT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {features.map((item) => (
            <div key={item.title} style={{ padding: '14px 16px', border: '1px solid #2A2520', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#B8962E', flexShrink: 0, marginTop: '5px' }} />
              <div>
                <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '1px', textTransform: 'uppercase', color: '#ccc', marginBottom: '3px' }}>{item.title}</div>
                <div style={{ fontSize: '12px', color: '#666', fontWeight: 300, lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
