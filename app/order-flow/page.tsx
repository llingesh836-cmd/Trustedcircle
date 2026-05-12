import Link from 'next/link';

const steps = [
  { title: 'Select Voucher', description: 'Choose brand, amount, and quantity.' },
  { title: 'Add to Cart', description: 'Update quantity and continue shopping or checkout.' },
  { title: 'Create Order', description: 'Our backend reserves your voucher and creates an order ID.' },
  { title: 'Payment', description: 'Complete checkout via secure payment gateway and verify the order.' },
  { title: 'Receive Voucher', description: 'Get your voucher code instantly after payment verification.' },
];

export default function OrderFlowPage() {
  return (
    <div className="min-h-[80vh] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-card">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Order Flow</p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-900">Track the order flow from checkout to voucher delivery</h1>
              <p className="mt-3 text-slate-600">We support a simple and reliable order journey for every voucher purchase.</p>
            </div>
            <Link href="/" className="inline-flex items-center justify-center rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-600">
              Back to home
            </Link>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {steps.map((step, idx) => (
            <div key={step.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-brand-500 text-white text-lg font-bold">
                {idx + 1}
              </div>
              <h2 className="text-xl font-semibold text-slate-900">{step.title}</h2>
              <p className="mt-3 text-sm text-slate-600">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-card">
          <h2 className="text-xl font-semibold text-slate-900">Need a live order example?</h2>
          <p className="mt-3 text-slate-600">Browse vouchers and start a purchase to see the real order flow in action.</p>
          <Link href="/" className="mt-6 inline-flex rounded-full bg-gradient-to-r from-brand-500 to-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:from-brand-600 hover:to-brand-700">
            Browse vouchers
          </Link>
        </div>
      </div>
    </div>
  );
}
