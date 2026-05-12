'use client';

import VoucherCard from './VoucherCard';
import { vouchers } from '@/lib/mockData';

export default function VouchersSection() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 bg-slate-50">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-600">Voucher Marketplace</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-slate-900">Live vouchers with quantity, amounts, and instant checkout</h2>
          </div>
          <p className="max-w-xl text-sm text-slate-600">Choose a fixed voucher amount, update quantity with the plus/minus buttons, add to cart, or buy instantly using our live order and payment flow.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {vouchers.map((voucher) => (
            <VoucherCard key={voucher.id} voucher={voucher} />
          ))}
        </div>
      </div>
    </section>
  );
}
