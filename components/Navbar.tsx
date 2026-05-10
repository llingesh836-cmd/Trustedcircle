'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CartSidebar from './CartSidebar';

export default function Navbar() {
  const [user, setUser] = useState<{ name: string; email: string; phone: string } | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('trustedcircle-user') : null;
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('trustedcircle-user');
    setUser(null);
    router.push('/login');
  };

  const navItems = user
    ? [
        { href: '/', label: 'Home' },
        { href: '/profile', label: 'Profile' },
      ]
    : [
        { href: '/', label: 'Home' },
        { href: '/login', label: 'Login' },
        { href: '/register', label: 'Register' },
      ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-gradient-to-r from-white to-slate-50 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/brand/logo.png"
            alt="Trusted Circle"
            width={32}
            height={32}
            className="rounded-lg"
          />
          <span className="text-lg font-bold bg-gradient-to-r from-brand-600 to-brand-500 bg-clip-text text-transparent">
            Trusted Circle
          </span>
        </Link>

        <nav className="hidden md:flex flex-wrap items-center gap-1 text-sm font-medium text-slate-700">
          {navItems.map((item) => (
            <Link
              href={item.href}
              key={item.href}
              className={`rounded-lg px-3 py-2 transition ${
                pathname === item.href ? 'bg-brand-100 text-brand-700 font-semibold' : 'hover:bg-slate-100'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {user && (
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
              <span className="font-medium">{user.name}</span>
            </div>
          )}

          <CartSidebar />

          {user ? (
            <button
              type="button"
              onClick={handleLogout}
              className="hidden sm:inline-flex rounded-lg bg-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-300"
            >
              Logout
            </button>
          ) : null}
        </div>
      </div>
    </header>
  );
}
