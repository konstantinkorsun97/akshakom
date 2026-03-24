import type { Metadata } from "next";
import "./globals.css";
import { LangProvider } from '@/lib/LangContext';
import { CartProvider } from '@/lib/CartContext';
import { FavoritesProvider } from '@/lib/FavoritesContext';

export const metadata: Metadata = {
  title: 'АкшаКом — Комиссионный магазин',
  description: 'Комиссионная продажа золотых украшений и техники в Карагандe. Честное описание состояния каждого товара.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <LangProvider>
          <CartProvider>
            <FavoritesProvider>
              {children}
            </FavoritesProvider>
          </CartProvider>
        </LangProvider>
      </body>
    </html>
  );
}
