'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[80vh] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-card text-center">
        <h1 className="text-4xl font-semibold text-slate-900">Something went wrong</h1>
        <p className="mt-3 text-slate-600">An error occurred. Please try again.</p>
        <button
          onClick={reset}
          className="mt-6 inline-block rounded-full bg-brand-500 px-6 py-3 font-semibold text-white transition hover:bg-brand-600"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}