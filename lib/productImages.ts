import { getPhotosByCategory } from './supabase'

const cache: Record<string, string[]> = {}

async function loadPhotos(category: string): Promise<string[]> {
  if (cache[category]) return cache[category]
  const photos = await getPhotosByCategory(category)
  cache[category] = photos.length > 0 ? photos : cache['default'] || []
  return cache[category]
}

const CATEGORY_MAP: Record<string, string> = {
  'к-цо': 'rings',
  'кольцо': 'rings',
  'печатка': 'rings',
  'обручал': 'rings',

  'с-ги': 'earrings',
  'с-га': 'earrings',
  'серьг': 'earrings',
  'серьга': 'earrings',

  'цепь': 'chains',
  'цепочка': 'chains',
  'цепь+': 'chains',

  'бр-т': 'bracelets',
  'браслет': 'bracelets',

  'п-ка': 'pendants',
  'к-он': 'pendants',
  'кулон': 'pendants',
  'подвеска': 'pendants',

  'колье': 'chains',
  'ожерелье': 'chains',
  'брошь': 'default',
  'брош': 'default',
  'булавка': 'default',
  'бусы': 'default',
  'пирсинг': 'default',
}

export function getCategoryForProduct(nameDisplay: string): string {
  const name = nameDisplay.toLowerCase()
  for (const [key, cat] of Object.entries(CATEGORY_MAP)) {
    if (name.includes(key)) return cat
  }
  return 'default'
}

export function getProductImage(photos: string[], id: number): string {
  if (!photos || photos.length === 0) return ''
  return photos[id % photos.length]
}

export { loadPhotos }

export function getConditionStyle(condition: string): { bg: string, color: string, label: string } {
  switch (condition) {
    case 'Отличное': return { bg: '#EAF3DE', color: '#3B6D11', label: 'Отличное' }
    case 'Хорошее': return { bg: '#E6F1FB', color: '#185FA5', label: 'Хорошее' }
    case 'Удовлетворительное': return { bg: '#FAEEDA', color: '#854F0B', label: 'Удовлетвор.' }
    case 'Дефект': return { bg: '#FCEBEB', color: '#A32D2D', label: 'Дефект' }
    default: return { bg: '#F1EFE8', color: '#5F5E5A', label: condition }
  }
}