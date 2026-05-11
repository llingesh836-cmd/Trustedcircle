import './globals.css';
import type { Metadata } from 'next';
import { CartProvider } from '@/context/CartContext';

export const metadata: Metadata = {
  title: 'Trusted Circle - Premium Gift Cards Marketplace',
  description: 'Shop discounted gift cards from 1000+ trusted brands. Instant delivery, secure payments, and exclusive rewards.',
  icons: {
    icon: '/assets/brand/logo.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900">
        <CartProvider>
          <main>{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
