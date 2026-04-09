'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLang } from '@/lib/LangContext'
import { t } from '@/lib/translations'
import { useIsMobile } from '@/lib/useIsMobile'
import { useCart } from '@/lib/CartContext'
import { useFavorites } from '@/lib/FavoritesContext'

type UploadResult = {
  success?: boolean
  added?: number
  updated?: number
  deactivated?: number
  errors?: number
  total?: number
  error?: string
}

export default function Header() {
  const { lang, setLang } = useLang()
  const tr = t[lang]
  const isMobile = useIsMobile()
  const { totalCount } = useCart()
  const { totalCount: favCount } = useFavorites()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  // Модальное окно входа
  const [modalOpen, setModalOpen] = useState(false)
  const [step, setStep] = useState<'password' | 'upload'>('password')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [checkingPassword, setCheckingPassword] = useState(false)

  // Загрузка файла
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [result, setResult] = useState<UploadResult | null>(null)

  const navItems = [
    { label: tr.nav_home, href: '/' },
    { label: tr.nav_jewelry, href: '/jewelry' },
    { label: tr.nav_tech, href: '/tech' },
    { label: tr.nav_trending, href: '/trending' },
    { label: tr.nav_sale, href: '/sale' },
    { label: tr.nav_consign, href: '/consign' },
  ]

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/jewelry?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
      setMenuOpen(false)
    }
  }

  function openModal() {
    setModalOpen(true)
    setStep('password')
    setPassword('')
    setPasswordError('')
    setFile(null)
    setResult(null)
  }

  function closeModal() {
    setModalOpen(false)
    setStep('password')
    setPassword('')
    setPasswordError('')
    setFile(null)
    setResult(null)
  }

  async function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!password) return
    setCheckingPassword(true)
    setPasswordError('')
    try {
      // Проверяем пароль через API
      const formData = new FormData()
      formData.append('password', password)
      formData.append('check_only', 'true')
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      const data = await res.json()
      if (res.status === 401) {
        setPasswordError('Неверный пароль. Попробуйте ещё раз.')
      } else {
        setStep('upload')
      }
    } catch {
      setPasswordError('Ошибка соединения. Попробуйте ещё раз.')
    } finally {
      setCheckingPassword(false)
    }
  }

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault()
    if (!file) return
    setUploading(true)
    setResult(null)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('password', password)
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      const data = await res.json()
      setResult(data)
    } catch {
      setResult({ error: 'Ошибка соединения с сервером. Проверьте интернет и попробуйте снова.' })
    } finally {
      setUploading(false)
    }
  }

  return (
    <>
      {/* TOP BAR — только десктоп */}
      {!isMobile && (
        <div style={{ background: '#1A1612', padding: '8px 40px', display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '11px', color: '#666', fontWeight: 300, letterSpacing: '1px' }}>{tr.topbar_left}</span>
          <span style={{ fontSize: '11px', color: '#D4AF57', fontWeight: 300, letterSpacing: '1px' }}>
            +7 771 270 7975 · WhatsApp · @zoloto_karaganda_torgi
          </span>
        </div>
      )}

      <header style={{ background: '#fff', borderBottom: '1px solid #E2D9CC', position: 'sticky', top: 0, zIndex: 100 }}>

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
            <form onSubmit={handleSearch} style={{ flex: 1, maxWidth: '400px', margin: '0 40px', display: 'flex' }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <svg style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '15px', height: '15px', stroke: '#4A4540', fill: 'none', strokeWidth: 1.5 }} viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                </svg>
                <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  placeholder={tr.search_placeholder}
                  style={{ width: '100%', padding: '9px 16px 9px 38px', border: '1px solid #E2D9CC', borderRight: 'none', background: '#F7F4EF', fontSize: '13px', fontFamily: '"Jost", sans-serif', fontWeight: 300, color: '#1A1612', outline: 'none' }} />
              </div>
              <button type="submit"
                style={{ padding: '9px 16px', background: '#1A1612', color: '#B8962E', border: 'none', cursor: 'pointer', fontSize: '11px', letterSpacing: '1px', fontFamily: '"Jost", sans-serif' }}>
                {lang === 'ru' ? 'Найти' : 'Іздеу'}
              </button>
            </form>
          )}

          {/* ПРАВАЯ ЧАСТЬ */}
          <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '8px' : '16px' }}>

            {/* ЯЗЫК */}
            <div style={{ display: 'flex' }}>
              {(['ru', 'kz'] as const).map((l, i) => (
                <button key={l} onClick={() => setLang(l)}
                  style={{ padding: isMobile ? '4px 8px' : '5px 12px', fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase', background: lang === l ? '#1A1612' : 'transparent', color: lang === l ? '#B8962E' : '#888', border: '1px solid #E2D9CC', borderRight: i === 0 ? 'none' : '1px solid #E2D9CC', cursor: 'pointer', fontFamily: '"Jost", sans-serif', fontWeight: lang === l ? 500 : 300 }}>
                  {l === 'ru' ? 'РУ' : 'ҚАЗ'}
                </button>
              ))}
            </div>

            {/* ИКОНКИ — только десктоп */}
            {!isMobile && (
              <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                <button onClick={openModal}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', color: '#4A4540', fontSize: '11px', fontFamily: '"Jost", sans-serif', fontWeight: 300, letterSpacing: '1px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                  </svg>
                  {tr.login}
                </button>
                <a href="/favorites" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', color: '#4A4540', fontSize: '11px', fontFamily: '"Jost", sans-serif', fontWeight: 300, letterSpacing: '1px', position: 'relative' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  {tr.favorites}
                  {favCount > 0 && (
                    <span style={{ position: 'absolute', top: '-4px', right: '-4px', background: '#C0392B', color: '#fff', fontSize: '9px', width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 500 }}>{favCount}</span>
                  )}
                </a>
                <a href="/cart" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', color: '#4A4540', fontSize: '11px', fontFamily: '"Jost", sans-serif', fontWeight: 300, letterSpacing: '1px', position: 'relative' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                  {tr.cart}
                  <span style={{ position: 'absolute', top: '-4px', right: '-4px', background: '#B8962E', color: '#fff', fontSize: '9px', width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 500 }}>{totalCount}</span>
                </a>
              </div>
            )}

            {/* ИЗБРАННОЕ — мобильный */}
            {isMobile && (
              <a href="/favorites" style={{ textDecoration: 'none', color: '#4A4540', position: 'relative', display: 'flex' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                {favCount > 0 && (
                  <span style={{ position: 'absolute', top: '-4px', right: '-4px', background: '#C0392B', color: '#fff', fontSize: '9px', width: '15px', height: '15px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 500 }}>{favCount}</span>
                )}
              </a>
            )}

            {/* КОРЗИНА — мобильный */}
            {isMobile && (
              <a href="/cart" style={{ textDecoration: 'none', color: '#4A4540', position: 'relative', display: 'flex' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                <span style={{ position: 'absolute', top: '-4px', right: '-4px', background: '#B8962E', color: '#fff', fontSize: '9px', width: '15px', height: '15px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 500 }}>{totalCount}</span>
              </a>
            )}

            {/* БУРГЕР — мобильный */}
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

        {/* ПОИСК — мобильный */}
        {isMobile && (
          <form onSubmit={handleSearch} style={{ padding: '8px 16px 10px', borderTop: '1px solid #E2D9CC', display: 'flex', gap: '8px' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <svg style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', width: '14px', height: '14px', stroke: '#4A4540', fill: 'none', strokeWidth: 1.5 }} viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                placeholder={tr.search_placeholder}
                style={{ width: '100%', padding: '8px 12px 8px 32px', border: '1px solid #E2D9CC', background: '#F7F4EF', fontSize: '13px', fontFamily: '"Jost", sans-serif', fontWeight: 300, color: '#1A1612', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <button type="submit"
              style={{ padding: '8px 14px', background: '#1A1612', color: '#B8962E', border: 'none', cursor: 'pointer', fontSize: '11px', fontFamily: '"Jost", sans-serif', whiteSpace: 'nowrap' }}>
              {lang === 'ru' ? 'Найти' : 'Іздеу'}
            </button>
          </form>
        )}

        {/* NAV — десктоп */}
        {!isMobile && (
          <nav style={{ borderTop: '1px solid #E2D9CC', display: 'flex', justifyContent: 'center' }}>
            {navItems.map(item => (
              <a key={item.href} href={item.href} style={{ display: 'block', padding: '13px 20px', fontSize: '11px', fontWeight: 400, letterSpacing: '2px', textTransform: 'uppercase', textDecoration: 'none', color: '#4A4540', borderBottom: '2px solid transparent', transition: 'all .2s', whiteSpace: 'nowrap' }}>
                {item.label}
              </a>
            ))}
          </nav>
        )}

        {/* МОБИЛЬНОЕ МЕНЮ */}
        {isMobile && (
          <div style={{ maxHeight: menuOpen ? '500px' : '0', overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
            <nav style={{ borderTop: '1px solid #E2D9CC', display: 'flex', flexDirection: 'column', background: '#fff' }}>
              {navItems.map(item => (
                <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}
                  style={{ padding: '14px 20px', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', textDecoration: 'none', color: '#4A4540', borderBottom: '1px solid #F0EDE8', fontFamily: '"Jost", sans-serif' }}>
                  {item.label}
                </a>
              ))}
              <button onClick={() => { setMenuOpen(false); openModal() }}
                style={{ padding: '14px 20px', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', textDecoration: 'none', color: '#4A4540', borderBottom: '1px solid #F0EDE8', fontFamily: '"Jost", sans-serif', background: 'none', border: 'none', borderBottom: '1px solid #F0EDE8', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                </svg>
                {tr.login}
              </button>
              <div style={{ padding: '14px 20px', background: '#1A1612' }}>
                <div style={{ fontSize: '11px', color: '#D4AF57', letterSpacing: '1px', fontWeight: 300 }}>+7 771 270 7975</div>
                <div style={{ fontSize: '10px', color: '#555', letterSpacing: '1px', fontWeight: 300, marginTop: '4px' }}>WhatsApp · @zoloto_karaganda_torgi</div>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* МОДАЛЬНОЕ ОКНО */}
      {modalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(26,22,18,0.7)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
          onClick={e => { if (e.target === e.currentTarget) closeModal() }}>
          <div style={{ background: '#fff', width: '100%', maxWidth: '480px', padding: '40px', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}>

            {/* Кнопка закрыть */}
            <button onClick={closeModal}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', cursor: 'pointer', color: '#888', fontSize: '20px', lineHeight: 1 }}>
              ✕
            </button>

            {/* Заголовок */}
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '26px', fontWeight: 300, color: '#1A1612', marginBottom: '4px' }}>
                АКША<span style={{ color: '#B8962E' }}>КОМ</span>
              </div>
              <div style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: '#888' }}>
                {step === 'password' ? (lang === 'ru' ? 'Вход' : 'Кіру') : (lang === 'ru' ? 'Обновление каталога' : 'Каталогты жаңарту')}
              </div>
            </div>

            {/* ШАГ 1: ПАРОЛЬ */}
            {step === 'password' && (
              <form onSubmit={handlePasswordSubmit}>
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: '#B8962E', marginBottom: '8px' }}>
                    {lang === 'ru' ? 'Пароль' : 'Құпия сөз'}
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={e => { setPassword(e.target.value); setPasswordError('') }}
                    placeholder={lang === 'ru' ? 'Введите пароль' : 'Құпия сөзді енгізіңіз'}
                    autoFocus
                    style={{ width: '100%', padding: '12px 14px', border: `1px solid ${passwordError ? '#C0392B' : '#E2D9CC'}`, background: '#F7F4EF', fontSize: '14px', outline: 'none', boxSizing: 'border-box', fontFamily: '"Jost", sans-serif' }}
                  />
                  {passwordError && (
                    <div style={{ marginTop: '8px', padding: '10px 14px', background: '#FFF0F0', border: '1px solid #FFB0B0', fontSize: '12px', color: '#C0392B' }}>
                      ❌ {passwordError}
                    </div>
                  )}
                </div>
                <button type="submit" disabled={checkingPassword || !password}
                  style={{ width: '100%', padding: '14px', background: checkingPassword ? '#888' : '#1A1612', color: '#fff', border: 'none', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', cursor: checkingPassword ? 'default' : 'pointer', fontFamily: '"Jost", sans-serif' }}>
                  {checkingPassword ? (lang === 'ru' ? 'Проверка...' : 'Тексерілуде...') : (lang === 'ru' ? 'Войти' : 'Кіру')}
                </button>
              </form>
            )}

            {/* ШАГ 2: ЗАГРУЗКА ФАЙЛА */}
            {step === 'upload' && (
              <div>
                {/* Форма загрузки — показываем только если нет результата */}
                {!result && (
                  <form onSubmit={handleUpload}>
                    <div style={{ marginBottom: '20px' }}>
                      <div style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: '#B8962E', marginBottom: '8px' }}>
                        CSV файл из IBExpert
                      </div>
                      <input type="file" accept=".csv"
                        onChange={e => setFile(e.target.files?.[0] || null)}
                        style={{ width: '100%', padding: '10px 14px', border: '1px solid #E2D9CC', background: '#F7F4EF', fontSize: '13px', boxSizing: 'border-box', cursor: 'pointer', fontFamily: '"Jost", sans-serif' }}
                      />
                      {file && (
                        <div style={{ marginTop: '8px', padding: '8px 12px', background: '#F0FFF0', border: '1px solid #B0EEB0', fontSize: '12px', color: '#27AE60', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          ✓ <strong>{file.name}</strong> — {(file.size / 1024).toFixed(0)} KB
                        </div>
                      )}
                    </div>

                    {/* Индикатор загрузки */}
                    {uploading && (
                      <div style={{ marginBottom: '16px', padding: '14px', background: '#F7F4EF', border: '1px solid #E2D9CC', textAlign: 'center' }}>
                        <div style={{ fontSize: '13px', color: '#4A4540', marginBottom: '8px' }}>
                          ⏳ {lang === 'ru' ? 'Обрабатываем файл...' : 'Файл өңделуде...'}
                        </div>
                        <div style={{ height: '4px', background: '#E2D9CC', borderRadius: '2px', overflow: 'hidden' }}>
                          <div style={{ height: '100%', background: '#B8962E', borderRadius: '2px', animation: 'progress 1.5s ease-in-out infinite', width: '60%' }} />
                        </div>
                        <style>{`@keyframes progress { 0% { transform: translateX(-100%) } 100% { transform: translateX(200%) } }`}</style>
                      </div>
                    )}

                    <button type="submit" disabled={uploading || !file}
                      style={{ width: '100%', padding: '14px', background: uploading ? '#888' : '#1A1612', color: '#fff', border: 'none', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', cursor: uploading ? 'default' : 'pointer', fontFamily: '"Jost", sans-serif', marginBottom: '16px' }}>
                      {uploading ? (lang === 'ru' ? 'Загрузка...' : 'Жүктелуде...') : (lang === 'ru' ? 'Загрузить и обновить' : 'Жүктеу және жаңарту')}
                    </button>
                  </form>
                )}

                {/* РЕЗУЛЬТАТ УСПЕХ */}
                {result?.success && (
                  <div>
                    <div style={{ padding: '16px', background: '#F0FFF4', border: '1px solid #B0EEB0', marginBottom: '20px', textAlign: 'center' }}>
                      <div style={{ fontSize: '28px', marginBottom: '8px' }}>✅</div>
                      <div style={{ fontSize: '14px', fontWeight: 500, color: '#27AE60', marginBottom: '4px' }}>
                        {lang === 'ru' ? 'Каталог успешно обновлён!' : 'Каталог сәтті жаңартылды!'}
                      </div>
                      <div style={{ fontSize: '11px', color: '#888' }}>
                        {lang === 'ru' ? 'Сайт уже отображает актуальные данные' : 'Сайт қазір өзекті деректерді көрсетеді'}
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '20px' }}>
                      {[
                        { label: lang === 'ru' ? 'Всего в файле' : 'Файлда барлығы', value: result.total, color: '#1A1612', bg: '#F7F4EF' },
                        { label: lang === 'ru' ? 'Добавлено новых' : 'Жаңа қосылды', value: result.added, color: '#27AE60', bg: '#F0FFF4' },
                        { label: lang === 'ru' ? 'Обновлено' : 'Жаңартылды', value: result.updated, color: '#2980B9', bg: '#F0F8FF' },
                        { label: lang === 'ru' ? 'Снято с продажи' : 'Сатудан алынды', value: result.deactivated, color: '#E67E22', bg: '#FFF8F0' },
                      ].map(item => (
                        <div key={item.label} style={{ padding: '12px', background: item.bg, border: '1px solid #E2D9CC', textAlign: 'center' }}>
                          <div style={{ fontSize: '26px', fontWeight: 600, color: item.color, fontFamily: '"Cormorant Garamond", serif' }}>{item.value}</div>
                          <div style={{ fontSize: '9px', color: '#888', letterSpacing: '1px', textTransform: 'uppercase', marginTop: '2px' }}>{item.label}</div>
                        </div>
                      ))}
                    </div>
                    {(result.errors || 0) > 0 && (
                      <div style={{ padding: '10px 14px', background: '#FFF8F0', border: '1px solid #FFD0A0', fontSize: '12px', color: '#E67E22', marginBottom: '16px' }}>
                        ⚠ {lang === 'ru' ? `При обработке ${result.errors} строк возникли ошибки — они пропущены` : `Өңдеу кезінде ${result.errors} жолда қате болды — олар өткізілді`}
                      </div>
                    )}
                    <button onClick={() => { setFile(null); setResult(null) }}
                      style={{ width: '100%', padding: '12px', background: 'transparent', color: '#1A1612', border: '1px solid #E2D9CC', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer', fontFamily: '"Jost", sans-serif' }}>
                      {lang === 'ru' ? 'Загрузить ещё раз' : 'Қайта жүктеу'}
                    </button>
                  </div>
                )}

                {/* РЕЗУЛЬТАТ ОШИБКА */}
                {result?.error && (
                  <div>
                    <div style={{ padding: '16px', background: '#FFF0F0', border: '1px solid #FFB0B0', marginBottom: '20px', textAlign: 'center' }}>
                      <div style={{ fontSize: '28px', marginBottom: '8px' }}>❌</div>
                      <div style={{ fontSize: '14px', fontWeight: 500, color: '#C0392B', marginBottom: '8px' }}>
                        {lang === 'ru' ? 'Ошибка при загрузке' : 'Жүктеу қатесі'}
                      </div>
                      <div style={{ fontSize: '12px', color: '#854F0B', lineHeight: 1.6 }}>
                        {result.error}
                      </div>
                    </div>
                    <div style={{ padding: '12px 16px', background: '#F7F4EF', border: '1px solid #E2D9CC', fontSize: '12px', color: '#4A4540', lineHeight: 1.7, marginBottom: '16px' }}>
                      <strong>{lang === 'ru' ? 'Что делать:' : 'Не істеу керек:'}</strong><br />
                      {lang === 'ru'
                        ? '• Убедитесь что файл в формате CSV\n• Разделитель должен быть точка с запятой (;)\n• Файл должен содержать заголовки колонок\n• Попробуйте экспортировать снова из IBExpert'
                        : '• CSV форматында екенін тексеріңіз\n• Бөлгіш нүктелі үтір (;) болуы тиіс\n• Файлда баған тақырыптары болуы тиіс\n• IBExpert-тен қайта экспорттауды көріңіз'}
                    </div>
                    <button onClick={() => { setFile(null); setResult(null) }}
                      style={{ width: '100%', padding: '12px', background: '#1A1612', color: '#fff', border: 'none', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer', fontFamily: '"Jost", sans-serif' }}>
                      {lang === 'ru' ? 'Попробовать снова' : 'Қайталап көру'}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
