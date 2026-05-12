'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import type { Voucher } from '../lib/mockData';

type Props = {
  voucher: Voucher;
};

export default function VoucherCard({ voucher }: Props) {
  const router = useRouter();
  const { addItem } = useCart();
  const [selectedAmount, setSelectedAmount] = useState<100 | 500 | 1000>(100);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const handleAddToCart = () => {
    addItem({
      voucherId: voucher.id,
      voucherName: voucher.brand,
      amount: selectedAmount,
      quantity,
      price: selectedAmount,
      discount: voucher.discount,
    });
    setQuantity(1);
    setMessage(`Added ${quantity} x ₹${selectedAmount} ${voucher.brand} to cart.`);
  };

  const handleBuyNow = async () => {
    setMessage(null);
    if (quantity < 1) {
      setMessage('Quantity must be at least 1.');
      return;
    }

    const stored = typeof window !== 'undefined' ? localStorage.getItem('trustedcircle-user') : null;
    if (!stored) {
      router.push('/login');
      return;
    }

    const user = JSON.parse(stored);
    setBusy(true);

    const response = await fetch('/api/orders/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        voucherId: voucher.id,
        amount: selectedAmount,
        quantity,
        userPhone: user.phone,
        userName: user.name,
        userEmail: user.email,
      }),
    });

    const data = await response.json();
    setBusy(false);

    if (response.ok) {
      router.push(`/processing?orderId=${data.order.id}`);
    } else {
      setMessage(data.error ?? 'Unable to create order.');
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="absolute right-4 top-4 h-20 w-20 overflow-hidden rounded-3xl bg-slate-100">
        <Image src={voucher.image} alt={`${voucher.brand} logo`} width={80} height={80} className="object-contain" loading="lazy" />
      </div>

      <div className="mb-4">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-600">{voucher.brand}</p>
        <div className="mt-2 inline-flex rounded-lg bg-gradient-to-r from-brand-500 to-brand-600 px-3 py-1">
          <span className="text-xs font-bold text-white">{voucher.discount}% OFF</span>
        </div>
      </div>

      <p className="text-sm text-slate-700 line-clamp-3 mb-4">{voucher.description}</p>

      <div className="mb-4">
        <p className="text-xs font-semibold text-slate-600 mb-2">Amount</p>
        <div className="flex gap-2">
          {([100, 500, 1000] as const).map((amount) => (
            <button
              key={amount}
              onClick={() => setSelectedAmount(amount)}
              className={`flex-1 rounded-lg py-2 text-xs font-semibold transition ${
                selectedAmount === amount
                  ? 'bg-brand-500 text-white'
                  : 'border border-slate-200 bg-white text-slate-700 hover:border-brand-300'
              }`}
            >
              ₹{amount}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2 mb-3">
        <div className="flex items-center rounded-lg border border-slate-200 bg-white">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-2 py-1 text-sm text-slate-600 hover:text-slate-900"
          >
            −
          </button>
          <span className="w-8 text-center text-sm font-semibold">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-2 py-1 text-sm text-slate-600 hover:text-slate-900"
          >
            +
          </button>
        </div>
        <button
          onClick={handleBuyNow}
          disabled={busy}
          className="flex-1 rounded-lg bg-white px-4 py-2 font-semibold text-slate-900 border border-slate-200 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {busy ? 'Preparing order…' : 'Buy Now'}
        </button>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleAddToCart}
          className="flex-1 rounded-lg bg-gradient-to-r from-brand-500 to-brand-600 px-4 py-2 font-semibold text-white transition hover:from-brand-600 hover:to-brand-700 shadow-sm"
        >
          Add to Cart
        </button>
      </div>

      {message ? <p className="mt-3 text-sm text-rose-600">{message}</p> : null}
    </div>
  );
}
