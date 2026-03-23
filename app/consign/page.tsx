import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function ConsignPage() {
  return (
    <>
      <Header />
      <div style={{background:'#F7F4EF', minHeight:'100vh'}}>

        {/* HERO */}
        <div style={{background:'#1A1612', padding:'64px 80px'}}>
          <div style={{fontSize:'10px', letterSpacing:'4px', textTransform:'uppercase', color:'#B8962E', marginBottom:'16px', fontWeight:400}}>Комиссионная продажа</div>
          <h1 style={{fontFamily:'"Cormorant Garamond", serif', fontSize:'48px', fontWeight:300, color:'#fff', marginBottom:'16px'}}>
            Как это работает и как<br/><em style={{fontStyle:'italic', color:'#D4AF57'}}>сдать на комиссию</em>
          </h1>
          <p style={{fontSize:'14px', color:'#777', fontWeight:300, lineHeight:1.8, maxWidth:'560px', margin:0}}>
            АкшаКом — комиссионный магазин. Мы принимаем золотые украшения и технику на продажу от частных лиц. Вы получаете деньги только после продажи вашего товара.
          </p>
        </div>

        {/* ДЛЯ ПОКУПАТЕЛЕЙ */}
        <div style={{padding:'64px 80px', borderBottom:'1px solid #E2D9CC'}}>
          <div style={{fontSize:'10px', letterSpacing:'4px', textTransform:'uppercase', color:'#B8962E', marginBottom:'16px', fontWeight:400}}>Для покупателей</div>
          <h2 style={{fontFamily:'"Cormorant Garamond", serif', fontSize:'36px', fontWeight:300, color:'#1A1612', marginBottom:'40px'}}>
            Как купить товар
          </h2>
          <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'2px', background:'#E2D9CC'}}>
            {[
              {num:'01', title:'Выберите товар', desc:'Просматривайте каталог на сайте. Все дефекты и особенности честно указаны в карточке товара.'},
              {num:'02', title:'Свяжитесь с нами', desc:'Позвоните или напишите в WhatsApp. Мы покажем реальные фотографии конкретного изделия.'},
              {num:'03', title:'Оплата', desc:'Оплата при получении наличными или переводом. Возможна рассрочка через Kaspi банк.'},
              {num:'04', title:'Получение', desc:'Самовывоз из магазина в Карагандe или доставка по всему Казахстану.'},
            ].map(item => (
              <div key={item.num} style={{background:'#fff', padding:'36px 28px'}}>
                <div style={{fontFamily:'"Cormorant Garamond", serif', fontSize:'48px', fontWeight:300, color:'#E2D9CC', lineHeight:1, marginBottom:'16px'}}>{item.num}</div>
                <div style={{fontSize:'13px', fontWeight:500, letterSpacing:'1px', textTransform:'uppercase', color:'#1A1612', marginBottom:'12px'}}>{item.title}</div>
                <div style={{fontSize:'13px', color:'#4A4540', fontWeight:300, lineHeight:1.7}}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ДЛЯ ПРОДАВЦОВ */}
        <div style={{padding:'64px 80px', borderBottom:'1px solid #E2D9CC', background:'#fff'}}>
          <div style={{fontSize:'10px', letterSpacing:'4px', textTransform:'uppercase', color:'#B8962E', marginBottom:'16px', fontWeight:400}}>Для продавцов</div>
          <h2 style={{fontFamily:'"Cormorant Garamond", serif', fontSize:'36px', fontWeight:300, color:'#1A1612', marginBottom:'40px'}}>
            Как сдать на комиссию
          </h2>
          <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'2px', background:'#E2D9CC'}}>
            {[
              {num:'01', title:'Принесите изделие', desc:'Приходите в магазин с золотым украшением или техникой. Оценка бесплатная и ни к чему не обязывает.'},
              {num:'02', title:'Оценка и описание', desc:'Мы проверяем пробу золота, взвешиваем, фиксируем все дефекты. Согласовываем цену с вами.'},
              {num:'03', title:'Размещение', desc:'Товар фотографируется и размещается на сайте с честным описанием. Вы можете отозвать товар в любой момент.'},
              {num:'04', title:'Выплата', desc:'После продажи мы выплачиваем вам деньги за вычетом комиссии магазина. Выплата в день продажи.'},
            ].map(item => (
              <div key={item.num} style={{background:'#F7F4EF', padding:'36px 28px'}}>
                <div style={{fontFamily:'"Cormorant Garamond", serif', fontSize:'48px', fontWeight:300, color:'#E2D9CC', lineHeight:1, marginBottom:'16px'}}>{item.num}</div>
                <div style={{fontSize:'13px', fontWeight:500, letterSpacing:'1px', textTransform:'uppercase', color:'#1A1612', marginBottom:'12px'}}>{item.title}</div>
                <div style={{fontSize:'13px', color:'#4A4540', fontWeight:300, lineHeight:1.7}}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* УСЛОВИЯ */}
        <div style={{padding:'64px 80px', borderBottom:'1px solid #E2D9CC'}}>
          <div style={{fontSize:'10px', letterSpacing:'4px', textTransform:'uppercase', color:'#B8962E', marginBottom:'16px', fontWeight:400}}>Условия</div>
          <h2 style={{fontFamily:'"Cormorant Garamond", serif', fontSize:'36px', fontWeight:300, color:'#1A1612', marginBottom:'40px'}}>
            Что мы принимаем
          </h2>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'40px'}}>
            <div>
              <div style={{fontSize:'13px', fontWeight:500, letterSpacing:'1px', textTransform:'uppercase', color:'#1A1612', marginBottom:'20px', paddingBottom:'12px', borderBottom:'1px solid #E2D9CC'}}>Украшения из золота</div>
              {[
                'Кольца, серьги, цепочки, браслеты, кулоны',
                'Проба от 375° до 999°',
                'Принимаем с дефектами и в любом состоянии',
                'Сломанные, гнутые, с царапинами — всё принимаем',
                'Без документов и чеков',
              ].map(item => (
                <div key={item} style={{display:'flex', gap:'12px', alignItems:'flex-start', marginBottom:'12px'}}>
                  <div style={{width:'6px', height:'6px', borderRadius:'50%', background:'#B8962E', flexShrink:0, marginTop:'5px'}}></div>
                  <div style={{fontSize:'13px', color:'#4A4540', fontWeight:300}}>{item}</div>
                </div>
              ))}
            </div>
            <div>
              <div style={{fontSize:'13px', fontWeight:500, letterSpacing:'1px', textTransform:'uppercase', color:'#1A1612', marginBottom:'20px', paddingBottom:'12px', borderBottom:'1px solid #E2D9CC'}}>Электронная техника</div>
              {[
                'Смартфоны, ноутбуки, планшеты',
                'Умные часы и аксессуары',
                'Принимаем рабочую и нерабочую технику',
                'С повреждениями корпуса',
                'Без коробки и документов',
              ].map(item => (
                <div key={item} style={{display:'flex', gap:'12px', alignItems:'flex-start', marginBottom:'12px'}}>
                  <div style={{width:'6px', height:'6px', borderRadius:'50%', background:'#B8962E', flexShrink:0, marginTop:'5px'}}></div>
                  <div style={{fontSize:'13px', color:'#4A4540', fontWeight:300}}>{item}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{background:'#1A1612', padding:'64px 80px', display:'flex', justifyContent:'space-between', alignItems:'center', gap:'40px'}}>
          <div>
            <div style={{fontFamily:'"Cormorant Garamond", serif', fontSize:'36px', fontWeight:300, color:'#fff', marginBottom:'8px'}}>
              Готовы сдать на <em style={{fontStyle:'italic', color:'#D4AF57'}}>комиссию?</em>
            </div>
            <div style={{fontSize:'13px', color:'#666', fontWeight:300}}>Приходите к нам или позвоните — оценим бесплатно</div>
          </div>
          <div style={{display:'flex', gap:'16px', flexShrink:0}}>
            <a href="tel:+77212000000" style={{background:'#B8962E', color:'#fff', padding:'14px 32px', fontSize:'11px', letterSpacing:'2px', textTransform:'uppercase', textDecoration:'none', fontFamily:'"Jost", sans-serif'}}>
              Позвонить
            </a>
            <a href="https://wa.me/77212000000" style={{border:'1px solid #2A2520', color:'#888', padding:'14px 32px', fontSize:'11px', letterSpacing:'2px', textTransform:'uppercase', textDecoration:'none', fontFamily:'"Jost", sans-serif'}}>
              WhatsApp
            </a>
          </div>
        </div>

      </div>
      <Footer />
    </>
  )
}