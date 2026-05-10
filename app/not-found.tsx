'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-card text-center">
        <h1 className="text-4xl font-semibold text-slate-900">Page Not Found</h1>
        <p className="mt-3 text-slate-600">The page you're looking for doesn't exist.</p>
        <Link href="/" className="mt-6 inline-block rounded-full bg-brand-500 px-6 py-3 font-semibold text-white transition hover:bg-brand-600">
          Go Home
        </Link>
      </div>
    </div>
  );
}