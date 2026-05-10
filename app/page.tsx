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
    <div className="bg-page px-4 py-8 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-6xl py-10">
        <div className="grid gap-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-card lg:grid-cols-[1.5fr_1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-brand-600">Trusted Circle</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              Secure vouchers with fast account access.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
              Browse the best voucher brands, manage orders, and keep your account safe with phone and email OTP verification.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/login" className="rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-600">
                Login
              </Link>
              <Link href="/register" className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-300">
                Register
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
            {user ? (
              <div className="space-y-4">
                <p className="text-sm font-medium text-brand-600">Welcome back</p>
                <h2 className="text-2xl font-semibold text-slate-900">Hello, {user.name}</h2>
                <p className="text-slate-600">Your account is ready to shop vouchers and track orders instantly.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm font-medium text-brand-600">New here?</p>
                <h2 className="text-2xl font-semibold text-slate-900">Create an account in minutes</h2>
                <p className="text-slate-600">Register with email, phone, and password, then verify via OTP to get started.</p>
              </div>
            )}
          </div>
        </div>

        <SectionHeader
          title="Discounted branded gift vouchers"
          description="Choose your favourite voucher, complete a fast checkout, and receive a ready-to-use voucher code instantly."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {loading ? (
            <div className="col-span-full rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-600 shadow-card">
              Loading vouchers...
            </div>
          ) : vouchers.length === 0 ? (
            <div className="col-span-full rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-600 shadow-card">
              No vouchers available yet.
            </div>
          ) : (
            vouchers.map((voucher) => <VoucherCard key={voucher.id} voucher={voucher} />)
          )}
        </div>
      </section>
    </div>
  );
}
