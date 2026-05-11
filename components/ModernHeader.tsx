'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X, Search, LogOut } from 'lucide-react';
import CartSidebar from './CartSidebar';
import { motion } from 'framer-motion';

export default function ModernHeader() {
  const [user, setUser] = useState<{ name: string; email: string; phone: string } | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('trustedcircle-user') : null;
    if (stored) {
      setUser(JSON.parse(stored));
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('trustedcircle-user');
    setUser(null);
    router.push('/login');
  };

  return (
    <>
      {/* Sticky Header */}
      <motion.header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'border-b border-slate-200/50 bg-white/80 backdrop-blur-xl shadow-sm'
            : 'border-b border-slate-200/30 bg-white/60 backdrop-blur-md'
        }`}
        initial={{ y: 0 }}
        animate={{ y: 0 }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3 gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <Image
                src="/assets/brand/logo.png"
                alt="Trusted Circle"
                width={36}
                height={36}
                className="rounded-lg"
              />
              <span className="hidden sm:inline text-lg font-bold bg-gradient-to-r from-brand-600 to-brand-500 bg-clip-text text-transparent">
                Trusted Circle
              </span>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-md mx-4">
              <div className="w-full relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="search"
                  placeholder="Search gift cards, brands..."
                  className="w-full pl-10 pr-4 py-2 rounded-full bg-slate-100/80 border border-slate-200 text-sm text-slate-900 placeholder-slate-500 transition focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200/50"
                />
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {user && (
                <div className="hidden sm:flex items-center gap-2 text-xs text-slate-600 bg-slate-100/80 px-3 py-1.5 rounded-full border border-slate-200">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-xs font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium">{user.name}</span>
                </div>
              )}

              <CartSidebar />

              {user ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="hidden sm:inline-flex items-center gap-2 rounded-full bg-slate-100/80 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 border border-slate-200"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="hidden sm:inline-flex rounded-full bg-slate-100/80 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 border border-slate-200"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="hidden sm:inline-flex rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-600"
                  >
                    Register
                  </Link>
                </>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="search"
                placeholder="Search gift cards..."
                className="w-full pl-10 pr-4 py-2 rounded-full bg-slate-100/80 border border-slate-200 text-sm text-slate-900 placeholder-slate-500 transition focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200/50"
              />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className="md:hidden border-t border-slate-200/30"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: mobileMenuOpen ? 'auto' : 0, opacity: mobileMenuOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ overflow: 'hidden' }}
        >
          <div className="px-4 py-3 space-y-2 bg-white/50 backdrop-blur-sm">
            <Link
              href="/"
              className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
            >
              Home
            </Link>
            {user && (
              <>
                <Link
                  href="/profile"
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
                >
                  Logout
                </button>
              </>
            )}
            {!user && (
              <>
                <Link
                  href="/login"
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block rounded-lg bg-brand-500 px-3 py-2 text-sm font-medium text-white hover:bg-brand-600 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </motion.div>
      </motion.header>
    </>
  );
}
