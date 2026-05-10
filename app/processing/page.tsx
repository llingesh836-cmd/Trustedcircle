import { Suspense } from 'react';
import ProcessingClient from './ProcessingClient';

export default function ProcessingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[80vh] px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-card">
            <p className="text-slate-600">Preparing the order processing page…</p>
          </div>
        </div>
      }
    >
      <ProcessingClient />
    </Suspense>
  );
}
