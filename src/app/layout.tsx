import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { CartProvider } from '@/context/cart-store';

export const metadata: Metadata = {
  title: 'Vistoria ArtLab',
  description: 'E-commerce artistico di quadri e oggettistica',
  openGraph: {
    title: 'Vistoria ArtLab',
    description: 'Art gallery meets playful colorful studio',
    url: 'http://localhost:3000',
    siteName: 'Vistoria ArtLab',
    locale: 'it_IT',
    type: 'website'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body>
        <CartProvider>
          <Header />
          <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
