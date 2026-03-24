'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type FavoriteItem = {
  id: string
  article: string
  name: string
  price: number
  proba: number
}

type FavoritesContextType = {
  items: FavoriteItem[]
  addItem: (item: FavoriteItem) => void
  removeItem: (id: string) => void
  toggleItem: (item: FavoriteItem) => void
  isInFavorites: (id: string) => boolean
  totalCount: number
}

const FavoritesContext = createContext<FavoritesContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  toggleItem: () => {},
  isInFavorites: () => false,
  totalCount: 0,
})

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<FavoriteItem[]>([])

  useEffect(() => {
    try {
      const saved = localStorage.getItem('favorites')
      if (saved) setItems(JSON.parse(saved))
    } catch {}
  }, [])

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(items))
  }, [items])

  function addItem(item: FavoriteItem) {
    setItems(prev => prev.find(i => i.id === item.id) ? prev : [...prev, item])
  }

  function removeItem(id: string) {
    setItems(prev => prev.filter(i => i.id !== id))
  }

  function toggleItem(item: FavoriteItem) {
    setItems(prev =>
      prev.find(i => i.id === item.id)
        ? prev.filter(i => i.id !== item.id)
        : [...prev, item]
    )
  }

  function isInFavorites(id: string) {
    return items.some(i => i.id === id)
  }

  return (
    <FavoritesContext.Provider value={{ items, addItem, removeItem, toggleItem, isInFavorites, totalCount: items.length }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  return useContext(FavoritesContext)
}
