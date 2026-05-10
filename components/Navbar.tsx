'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/profile', label: 'Profile' },
  { href: '/login', label: 'Login' },
];

export default function Navbar() {
  const [user, setUser] = useState<{ name: string; phone: string } | null>(null);
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
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="text-lg font-semibold text-slate-900">
          Trusted Circle
        </Link>

        <nav className="flex items-center gap-4 text-sm font-medium text-slate-700">
          {navItems.map((item) => (
            <Link
              href={item.href}
              key={item.href}
              className={`rounded-full px-3 py-2 transition ${pathname === item.href ? 'bg-slate-100 text-slate-900' : 'hover:bg-slate-100'}`}
            >
              {item.label}
            </Link>
          ))}

          {user ? (
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full bg-brand-500 px-4 py-2 text-white transition hover:bg-brand-600"
            >
              Logout
            </button>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
