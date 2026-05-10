'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type User = {
  name: string;
  email: string;
  phone: string;
};

type Order = {
  id: string;
  voucherName: string;
  amount: number;
  quantity: number;
  status: string;
  voucherCode?: string;
  createdAt: string;
};

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('trustedcircle-user') : null;
    if (!stored) {
      router.push('/login');
      return;
    }
    const parsed = JSON.parse(stored);
    setUser(parsed);
    fetch(`/api/orders?phone=${encodeURIComponent(parsed.phone)}`)
      .then((res) => res.json())
      .then((data) => setOrders(data.orders ?? []))
      .finally(() => setLoading(false));
  }, [router]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-[80vh] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-card">
          <h1 className="text-3xl font-semibold text-slate-900">Hi, {user.name}</h1>
          <p className="mt-3 text-slate-600">Your phone number is {user.phone} and your email is {user.email}.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-card">
            <h2 className="text-2xl font-semibold text-slate-900">Your Orders</h2>
            <p className="mt-3 text-slate-600">View recent purchase activity and voucher delivery details.</p>

            <div className="mt-6 space-y-4">
              {loading ? (
                <p className="text-slate-600">Loading order history…</p>
              ) : orders.length === 0 ? (
                <p className="text-slate-600">No orders found yet. Start shopping from the home page.</p>
              ) : (
                orders.map((order) => (
                  <div key={order.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm uppercase tracking-[0.24em] text-slate-500">{order.voucherName}</p>
                        <p className="mt-1 text-lg font-semibold text-slate-900">Order {order.id}</p>
                      </div>
                      <span className="rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-600">{order.status}</span>
                    </div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <p className="text-sm text-slate-600">Amount: ₹{order.amount}</p>
                      <p className="text-sm text-slate-600">Quantity: {order.quantity}</p>
                      <p className="text-sm text-slate-600">Created: {new Date(order.createdAt).toLocaleString()}</p>
                      <p className="text-sm text-slate-600">Voucher code: {order.voucherCode ?? 'Pending'}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-card">
            <h2 className="text-2xl font-semibold text-slate-900">Purchased Vouchers</h2>
            <p className="mt-3 text-slate-600">Your delivered voucher codes appear here after payment verification.</p>
            <div className="mt-6 space-y-4">
              {orders.length === 0 ? (
                <p className="text-slate-600">No purchased vouchers yet.</p>
              ) : (
                orders.map((order) => (
                  <div key={`${order.id}-code`} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm text-slate-600">{order.voucherName} • ₹{order.amount}</p>
                    <p className="mt-2 text-sm font-semibold text-slate-900">{order.voucherCode ?? 'Code will appear after payment'}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
