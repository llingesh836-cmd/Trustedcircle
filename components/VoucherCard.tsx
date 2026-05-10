'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import type { Voucher } from '../lib/mockData';

type Props = {
  voucher: Voucher;
};

export default function VoucherCard({ voucher }: Props) {
  const { addItem } = useCart();
  const [selectedAmount, setSelectedAmount] = useState<100 | 500 | 1000>(100);
  const [quantity, setQuantity] = useState(1);

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
    alert(`Added ${quantity} x ₹${selectedAmount} ${voucher.brand} to cart`);
  };

  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-brand-600">{voucher.brand}</p>
          <div className="rounded-lg bg-gradient-to-r from-brand-500 to-brand-600 px-3 py-1 mt-1 inline-block">
            <span className="text-xs font-bold text-white">{voucher.discount}% OFF</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-slate-700 line-clamp-2 mb-4">{voucher.description}</p>

      {/* Amount Selection */}
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

      {/* Quantity & Add to Cart */}
      <div className="flex gap-2">
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
          onClick={handleAddToCart}
          className="flex-1 rounded-lg bg-gradient-to-r from-brand-500 to-brand-600 px-4 py-2 font-semibold text-white transition hover:from-brand-600 hover:to-brand-700 shadow-sm"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
