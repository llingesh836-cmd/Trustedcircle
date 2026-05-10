'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

type Order = {
  id: string;
  voucherName: string;
  amount: number;
  quantity: number;
  status: string;
  voucherCode?: string;
};

export default function ProcessingClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams?.get('orderId');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [timer, setTimer] = useState(180);
  const [statusStep, setStatusStep] = useState(0);

  useEffect(() => {
    if (!orderId) {
      setLoading(false);
      return;
    }
    fetch(`/api/orders/${orderId}`)
      .then((res) => res.json())
      .then((data) => setOrder(data.order ?? null))
      .finally(() => setLoading(false));
  }, [orderId]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (processing) {
      interval = setInterval(() => {
        setTimer((prev) => Math.max(prev - 1, 0));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [processing]);

  const handlePay = async () => {
    if (!orderId) {
      setMessage('Missing order information.');
      return;
    }
    setMessage(null);
    setProcessing(true);

    const response = await fetch('/api/payment/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId }),
    });
    const data = await response.json();
    if (!response.ok) {
      setMessage(data.error ?? 'Payment failed.');
      setProcessing(false);
      return;
    }

    setOrder(data.order);
    setStatusStep(1);
    setTimeout(() => setStatusStep(2), 1500);
    setTimeout(() => setStatusStep(3), 3200);
    setTimeout(() => setStatusStep(4), 5200);
  };

  const formats = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainder = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-[80vh] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-card">
        <h1 className="text-3xl font-semibold text-slate-900">Order Processing</h1>
        <p className="mt-3 text-slate-600">Complete payment and track your voucher generation in real time.</p>

        {!orderId ? (
          <div className="mt-8 rounded-3xl border border-rose-200 bg-rose-50 p-6 text-rose-700">
            Missing order ID. Please return to the home page.
          </div>
        ) : loading ? (
          <p className="mt-8 text-slate-600">Loading order details...</p>
        ) : !order ? (
          <p className="mt-8 text-rose-600">Order not found. Please start again from the voucher page.</p>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.9fr]">
            <div className="space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Order summary</p>
                <div className="mt-4 space-y-3 text-slate-700">
                  <p>Voucher: {order.voucherName}</p>
                  <p>Amount: ₹{order.amount}</p>
                  <p>Quantity: {order.quantity}</p>
                  <p>Status: {order.status}</p>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Payment simulator</p>
                <p className="mt-3 text-slate-600">This demo simulates Razorpay integration for a fast checkout flow.</p>
                <button
                  type="button"
                  disabled={processing || order.status === 'completed'}
                  onClick={handlePay}
                  className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  {order.status === 'completed' ? 'Payment Completed' : processing ? 'Processing...' : 'Pay Now'}
                </button>
                {message ? <p className="mt-4 text-sm text-rose-600">{message}</p> : null}
              </div>
            </div>

            <div className="space-y-6 rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Countdown</p>
                <p className="mt-3 text-4xl font-semibold text-slate-900">{formats(timer)}</p>
                <p className="mt-2 text-sm text-slate-600">Estimated processing time for voucher generation.</p>
              </div>
              <div className="space-y-4">
                <div className={`rounded-3xl p-4 transition ${statusStep >= 1 ? 'bg-brand-50 border-brand-200 text-brand-700' : 'bg-white border-slate-200 text-slate-600'} border`}>
                  <p className="font-semibold">Payment received</p>
                  <p className="text-sm">Waiting for payment confirmation from the gateway.</p>
                </div>
                <div className={`rounded-3xl p-4 transition ${statusStep >= 2 ? 'bg-brand-50 border-brand-200 text-brand-700' : 'bg-white border-slate-200 text-slate-600'} border`}>
                  <p className="font-semibold">Verifying order</p>
                  <p className="text-sm">Checking inventory and user session.</p>
                </div>
                <div className={`rounded-3xl p-4 transition ${statusStep >= 3 ? 'bg-brand-50 border-brand-200 text-brand-700' : 'bg-white border-slate-200 text-slate-600'} border`}>
                  <p className="font-semibold">Generating voucher</p>
                  <p className="text-sm">Assigning the voucher code from our mock inventory.</p>
                </div>
                <div className={`rounded-3xl p-4 transition ${statusStep >= 4 ? 'bg-brand-50 border-brand-200 text-brand-700' : 'bg-white border-slate-200 text-slate-600'} border`}>
                  <p className="font-semibold">Completed</p>
                  <p className="text-sm">Your voucher code will be available below.</p>
                </div>
              </div>
              {order.voucherCode ? (
                <div className="rounded-3xl bg-white p-6 text-center shadow-sm">
                  <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Voucher Delivered</p>
                  <p className="mt-4 text-lg font-semibold text-slate-900">{order.voucherCode}</p>
                </div>
              ) : null}
            </div>
          </div>
        )}

        <div className="mt-8 text-slate-500">
          <button
            type="button"
            onClick={() => router.push('/')}
            className="text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
