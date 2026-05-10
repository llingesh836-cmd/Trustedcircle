'use client';

import Link from 'next/link';
import type { Voucher } from '../lib/mockData';

type Props = {
  voucher: Voucher;
};

export default function VoucherCard({ voucher }: Props) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">{voucher.brand}</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-900">{voucher.brand} Voucher</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">{voucher.description}</p>
        </div>
        <div className="rounded-3xl bg-brand-50 px-4 py-3 text-right text-sm font-semibold text-brand-600">
          {voucher.discount}% off
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between gap-4">
        <Link
          href={`/voucher/${voucher.id}`}
          className="rounded-full bg-brand-500 px-5 py-3 text-white transition hover:bg-brand-600"
        >
          Buy Now
        </Link>
        <span className="text-sm text-slate-500">Instant delivery</span>
      </div>
    </div>
  );
}
