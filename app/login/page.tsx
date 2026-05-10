'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setMessage(null);
    if (!email || !password) {
      setMessage('Please enter both email and password.');
      return;
    }

    setLoading(true);
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    setLoading(false);

    if (response.ok) {
      localStorage.setItem('trustedcircle-user', JSON.stringify({ name: data.user.name, email: data.user.email, phone: data.user.phone }));
      router.push('/profile');
    } else {
      setMessage(data.error ?? 'Login failed.');
    }
  };

  return (
    <div className="min-h-[80vh] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 shadow-card">
        <h1 className="text-3xl font-semibold text-slate-900">Login to Trusted Circle</h1>
        <p className="mt-3 text-slate-600">Use your registered email and password to access your profile and vouchers.</p>

        <div className="mt-8 grid gap-6">
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Your password"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            />
          </label>

          {message ? <p className="text-sm text-rose-600">{message}</p> : null}

          <button
            type="button"
            onClick={handleLogin}
            disabled={loading}
            className="inline-flex w-full items-center justify-center rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {loading ? 'Signing in…' : 'Login'}
          </button>

          <p className="text-sm text-slate-600">
            New to Trusted Circle?{' '}
            <Link href="/register" className="font-semibold text-brand-600 hover:text-brand-700">
              Register now
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
