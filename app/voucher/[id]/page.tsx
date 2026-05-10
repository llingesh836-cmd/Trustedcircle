'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Voucher } from '../../../lib/mockData';

type VoucherPageProps = {
  params: { id: string };
};

export default function VoucherDetailPage({ params }: VoucherPageProps) {
  const router = useRouter();
  const [voucher, setVoucher] = useState<Voucher | null>(null);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState<100 | 500 | 1000>(100);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const response = await fetch('/api/vouchers');
      const data = await response.json();
      const found = data.vouchers.find((item: Voucher) => item.id === params.id);
      setVoucher(found ?? null);
      setLoading(false);
    };
    load();
  }, [params.id]);

  const handleBuyNow = async () => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('trustedcircle-user') : null;
    if (!stored) {
      router.push('/login');
      return;
    }

    const user = JSON.parse(stored);
    const response = await fetch('/api/orders/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        voucherId: params.id,
        amount,
        quantity,
        userPhone: user.phone,
        userName: user.name,
        userEmail: user.email,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      router.push(`/processing?orderId=${data.order.id}`);
    } else {
      setMessage(data.error ?? 'Unable to create order.');
    }
  };

  return (
    <div className="min-h-[80vh] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-card">
        {loading ? (
          <p className="text-slate-600">Loading voucher information...</p>
        ) : !voucher ? (
          <p className="text-rose-600">Voucher not found. Please return to the home page.</p>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{voucher.brand}</p>
              <h1 className="mt-3 text-4xl font-semibold text-slate-900">{voucher.brand} Gift Voucher</h1>
              <p className="mt-5 text-slate-600">{voucher.description}</p>
              <div className="mt-8 space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">Discount</span>
                  <span className="rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-600">{voucher.discount}%</span>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {[100, 500, 1000].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setAmount(value as 100 | 500 | 1000)}
                      className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${amount === value ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'}`}
                    >
                      ₹{value}
                    </button>
                  ))}
                </div>
                <label className="space-y-2 text-sm text-slate-700">
                  Quantity
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={quantity}
                    onChange={(event) => setQuantity(Number(event.target.value))}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                  />
                </label>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Order summary</p>
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Brand</span>
                  <span>{voucher.brand}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Amount</span>
                  <span>₹{amount}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Quantity</span>
                  <span>{quantity}</span>
                </div>
                <div className="flex items-center justify-between text-slate-900">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">₹{amount * quantity}</span>
                </div>
              </div>

              {message ? <p className="mt-4 text-sm text-rose-600">{message}</p> : null}

              <div className="mt-8 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
                >
                  Buy Now
                </button>
                <button
                  type="button"
                  onClick={() => setMessage('Add to cart is UI-only in this mock demo.')}
                  className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
