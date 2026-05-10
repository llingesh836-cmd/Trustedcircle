'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import VoucherCard from '../components/VoucherCard';
import type { Voucher } from '../lib/mockData';

export default function HomePage() {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    const load = async () => {
      const response = await fetch('/api/vouchers');
      const data = await response.json();
      setVouchers(data.vouchers ?? []);
      setLoading(false);
    };
    load();

    const stored = typeof window !== 'undefined' ? localStorage.getItem('trustedcircle-user') : null;
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed);
    }
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-500 via-brand-400 to-blue-400 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
                Best Deals on Gift Vouchers
              </h1>
              <p className="mt-4 text-lg text-white/90">
                Shop your favorite brands with instant delivery
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {user ? (
                  <button className="rounded-lg bg-white px-6 py-3 font-semibold text-brand-600 transition hover:bg-slate-100">
                    Start Shopping
                  </button>
                ) : (
                  <>
                    <Link
                      href="/register"
                      className="rounded-lg bg-white px-6 py-3 font-semibold text-brand-600 transition hover:bg-slate-100"
                    >
                      Get Started
                    </Link>
                    <Link
                      href="/login"
                      className="rounded-lg border-2 border-white bg-transparent px-6 py-3 font-semibold text-white transition hover:bg-white/10"
                    >
                      Login
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative h-64 w-full rounded-2xl bg-gradient-to-br from-white/20 to-transparent backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <svg className="h-32 w-32 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Vouchers */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-b-2 border-brand-500"></div>
              <p className="mt-4 text-slate-600">Loading vouchers...</p>
            </div>
          ) : vouchers.length === 0 ? (
            <div className="text-center py-12 text-slate-600">
              <p>No vouchers available yet</p>
            </div>
          ) : (
            <>
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-slate-900">Popular Vouchers</h2>
                <p className="mt-2 text-slate-600">Choose from top brands and get instant codes</p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {vouchers.map((voucher) => (
                  <VoucherCard key={voucher.id} voucher={voucher} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-900 px-4 py-16 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold text-white">Need Help?</h2>
          <p className="mt-3 text-slate-300">Add vouchers to cart, checkout, and get instant delivery</p>
        </div>
      </section>
    </div>
  );
}
