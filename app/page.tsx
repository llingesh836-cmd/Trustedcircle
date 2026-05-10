'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import VoucherCard from '../components/VoucherCard';
import type { Voucher } from '../lib/mockData';

export default function HomePage() {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [search, setSearch] = useState('');

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

  const filteredVouchers = useMemo(
    () =>
      vouchers.filter((voucher) =>
        `${voucher.brand} ${voucher.description}`.toLowerCase().includes(search.toLowerCase())
      ),
    [search, vouchers]
  );

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(251,146,60,0.35),_transparent_18%),radial-gradient(circle_at_top_right,_rgba(251,191,36,0.22),_transparent_16%),radial-gradient(circle_at_bottom_left,_rgba(249,115,22,0.18),_transparent_20%),linear-gradient(135deg,_#f97316_0%,_#fb923c_100%)] px-4 py-20 sm:px-6 lg:px-8 text-white">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute right-16 top-24 h-44 w-44 rounded-full bg-orange-400/20 blur-3xl" />
          <div className="absolute left-10 bottom-10 h-48 w-48 rounded-full bg-brand-300/20 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-6">
              <p className="inline-flex rounded-full bg-white/15 px-4 py-2 text-xs uppercase tracking-[0.35em] text-white/90 backdrop-blur-sm">
                Multi-brand rewards
              </p>
              <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl">
                Smart voucher shopping for every brand and budget
              </h1>
              <p className="max-w-2xl text-lg text-white/80">
                Get instant branded gift vouchers, secure checkout, and live order tracking. Explore an upgraded shopping experience with smart search, featured deals, and better checkout flow.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href={user ? '/voucher/1' : '/register'}
                  className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-600 transition hover:bg-slate-100"
                >
                  {user ? 'Shop vouchers' : 'Start for free'}
                </Link>
                <Link
                  href="/login"
                  className="rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
                >
                  Login
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/10 p-8 shadow-2xl shadow-slate-950/10 backdrop-blur-xl">
              <div className="mb-6 rounded-3xl bg-white/10 p-5 text-sm text-white/90 ring-1 ring-white/10">
                <p className="font-semibold">Upgrade includes</p>
                <ul className="mt-4 space-y-3 text-sm text-white/80">
                  <li>• Faster voucher discovery</li>
                  <li>• Multi-color premium UI</li>
                  <li>• Secure Razorpay checkout</li>
                  <li>• Instant code delivery</li>
                </ul>
              </div>
              <div className="space-y-4">
                <div className="rounded-3xl bg-white/15 p-4">
                  <p className="text-xs uppercase tracking-[0.35em] text-white/70">Fast search</p>
                  <p className="mt-2 text-lg font-semibold text-white">Search brands instantly</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-white/10 p-4">
                    <p className="text-sm font-semibold text-white">Top discounts</p>
                    <p className="mt-2 text-sm text-white/80">See the best voucher margins.</p>
                  </div>
                  <div className="rounded-3xl bg-white/10 p-4">
                    <p className="text-sm font-semibold text-white">Live order status</p>
                    <p className="mt-2 text-sm text-white/80">Track your voucher generation steps.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            title="Advanced features for effortless gifting"
            description="Browse vouchers with smart search, highlight savings, and checkout securely. Every voucher includes instant delivery and easy tracking."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-brand-600">Instant</p>
              <h3 className="mt-4 text-2xl font-semibold text-slate-900">Instant delivery</h3>
              <p className="mt-3 text-slate-600">Get voucher codes immediately after payment with a smooth checkout flow.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-brand-600">Secure</p>
              <h3 className="mt-4 text-2xl font-semibold text-slate-900">Secure checkout</h3>
              <p className="mt-3 text-slate-600">Payments are handled securely with Razorpay and signature verification.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-brand-600">Smart</p>
              <h3 className="mt-4 text-2xl font-semibold text-slate-900">Brand discovery</h3>
              <p className="mt-3 text-slate-600">Search by brand, voucher value, or discount to find the perfect gift.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 grid gap-6 lg:grid-cols-[0.6fr_1fr] lg:items-end">
            <div className="rounded-3xl bg-gradient-to-br from-brand-500 to-brand-700 px-8 py-10 text-white shadow-card">
              <h2 className="text-3xl font-bold">Find vouchers faster</h2>
              <p className="mt-4 text-slate-100/90">Use the new smart search bar to filter vouchers by brand, description, and discount automatically.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
              <label htmlFor="search" className="block text-sm font-semibold text-slate-700">
                Search vouchers
              </label>
              <div className="mt-4 flex gap-3 flex-col sm:flex-row">
                <input
                  id="search"
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search brands, discounts, or categories"
                  className="min-w-0 flex-1 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
                />
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="rounded-3xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
                >
                  Clear
                </button>
              </div>
              <p className="mt-4 text-sm text-slate-500">Showing {filteredVouchers.length} of {vouchers.length} vouchers.</p>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-b-2 border-brand-500"></div>
              <p className="mt-4 text-slate-600">Loading vouchers...</p>
            </div>
          ) : filteredVouchers.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-600">
              <p className="text-lg font-semibold">No vouchers match your search.</p>
              <p className="mt-2">Try a different keyword or browse all top deals.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredVouchers.map((voucher) => (
                <VoucherCard key={voucher.id} voucher={voucher} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-gradient-to-r from-brand-600 via-orange-500 to-brand-500 px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-card backdrop-blur-xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <h2 className="text-3xl font-bold">Level up your gifting game</h2>
              <p className="mt-4 text-slate-100/90">
                Enjoy a more advanced voucher marketplace with richer visuals, faster workflows, and focused results.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/10 p-5">
                <p className="text-sm uppercase tracking-[0.35em] text-white/70">Feature</p>
                <p className="mt-3 text-lg font-semibold">Colorful UI</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/10 p-5">
                <p className="text-sm uppercase tracking-[0.35em] text-white/70">Feature</p>
                <p className="mt-3 text-lg font-semibold">Dynamic experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
