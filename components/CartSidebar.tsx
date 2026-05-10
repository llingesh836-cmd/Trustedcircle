'use client';

import { useCart } from '@/context/CartContext';
import { useState } from 'react';

export default function CartSidebar() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    const user = typeof window !== 'undefined' ? localStorage.getItem('trustedcircle-user') : null;
    if (!user) {
      alert('Please login to checkout');
      return;
    }

    const userData = JSON.parse(user);
    try {
      for (const item of items) {
        await fetch('/api/orders/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            voucherId: item.voucherId,
            amount: item.amount,
            quantity: item.quantity,
            userPhone: userData.phone,
            userName: userData.name,
            userEmail: userData.email,
          }),
        });
      }
      clearCart();
      alert('Order placed successfully!');
    } catch (error) {
      alert('Failed to place order');
    }
  };

  return (
    <>
      {/* Cart toggle button in header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-600 transition hover:bg-brand-100"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <span>{items.length}</span>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 z-50 h-screen w-full max-w-md transform overflow-y-auto bg-white shadow-lg transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="border-b border-slate-200 bg-gradient-to-r from-brand-500 to-brand-600 px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Shopping Cart</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 transition hover:text-white"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center px-6 py-12 text-center text-slate-500">
                <svg className="mb-3 h-12 w-12 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <p className="text-sm">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-3 px-6 py-4">
                {items.map((item) => (
                  <div
                    key={`${item.voucherId}-${item.amount}`}
                    className="rounded-lg border border-slate-200 bg-slate-50 p-3"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="font-semibold text-slate-900">{item.voucherName}</p>
                        <p className="text-xs text-slate-600">₹{item.amount}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.voucherId, item.amount)}
                        className="text-slate-400 transition hover:text-red-600"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 rounded-full bg-white border border-slate-200">
                        <button
                          onClick={() => updateQuantity(item.voucherId, item.amount, item.quantity - 1)}
                          className="px-2 py-1 text-sm text-slate-600 hover:text-slate-900"
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.voucherId, item.amount, item.quantity + 1)}
                          className="px-2 py-1 text-sm text-slate-600 hover:text-slate-900"
                        >
                          +
                        </button>
                      </div>
                      <p className="font-semibold text-slate-900">₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-slate-200 bg-slate-50 px-6 py-4 space-y-3">
              <div className="flex items-center justify-between">
                <p className="font-medium text-slate-700">Total:</p>
                <p className="text-2xl font-bold text-brand-600">₹{total}</p>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full rounded-full bg-gradient-to-r from-brand-500 to-brand-600 px-6 py-3 font-semibold text-white transition hover:from-brand-600 hover:to-brand-700 disabled:opacity-50"
              >
                Buy Now
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-full rounded-full border border-slate-200 px-6 py-2 font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
