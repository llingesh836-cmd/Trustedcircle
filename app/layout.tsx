import './globals.css';
import type { Metadata } from 'next';
import Navbar from '../components/Navbar';
import { CartProvider } from '@/context/CartContext';

export const metadata: Metadata = {
  title: 'Trusted Circle',
  description: 'Discounted branded gift vouchers with payment and order flow.',
  icons: {
    icon: '/assets/brand/logo.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-b from-orange-50 via-orange-100 to-white text-slate-900">
        <CartProvider>
          <Navbar />
          <main>{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
