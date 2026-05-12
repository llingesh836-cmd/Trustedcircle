'use client';

import Link from 'next/link';

const processSteps = [
  {
    title: 'Card Management',
    description: 'Save and manage your payment cards securely in one place for faster checkout.',
    href: '/card-management',
  },
  {
    title: 'Order Flow',
    description: 'Follow the full order journey from voucher selection to order confirmation.',
    href: '/order-flow',
  },
  {
    title: 'Payment Flow',
    description: 'Experience the payment flow and verification step for secure voucher delivery.',
    href: '/payment-flow',
  },
];

export default function ActivationProcess() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-b from-white to-slate-100">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-600">Activation Process</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-slate-900">Activate every step from card setup to voucher payment</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-600">Our platform guides users through card management, order creation, and payment verification for a complete gift card purchase experience.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {processSteps.map((step) => (
            <Link
              key={step.title}
              href={step.href}
              className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-brand-500 text-white text-lg font-bold shadow-sm">{step.title.charAt(0)}</div>
              <h3 className="text-xl font-semibold text-slate-900">{step.title}</h3>
              <p className="mt-3 text-sm text-slate-600">{step.description}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 group-hover:text-brand-700">
                View process
                <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
