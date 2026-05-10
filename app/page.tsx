'use client';

import { useEffect, useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import VoucherCard from '../components/VoucherCard';
import type { Voucher } from '../lib/mockData';

export default function HomePage() {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const response = await fetch('/api/vouchers');
      const data = await response.json();
      setVouchers(data.vouchers ?? []);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <div className="bg-page px-4 py-8 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-6xl py-10">
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
