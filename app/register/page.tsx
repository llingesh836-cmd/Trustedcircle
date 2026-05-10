'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'details' | 'verify'>('details');
  const [message, setMessage] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  const sendOtp = async () => {
    setMessage(null);
    if (!name || !email || !phone || !password || !confirmPassword) {
      setMessage('Please complete all fields before sending OTP.');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    setSending(true);
    const response = await fetch('/api/auth/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, phone }),
    });
    const data = await response.json();
    setSending(false);

    if (response.ok) {
      setStep('verify');
      setMessage('OTP sent to both email and phone. Use 123456 for this demo.');
    } else {
      setMessage(data.error ?? 'Unable to send OTP.');
    }
  };

  const verifyOtp = async () => {
    setMessage(null);
    if (!otp) {
      setMessage('Please enter the OTP.');
      return;
    }

    setSending(true);
    const response = await fetch('/api/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, password, otp }),
    });
    const data = await response.json();
    setSending(false);

    if (response.ok) {
      localStorage.setItem('trustedcircle-user', JSON.stringify({ name, email, phone }));
      router.push('/profile');
    } else {
      setMessage(data.error ?? 'OTP verification failed.');
    }
  };

  return (
    <div className="min-h-[80vh] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 shadow-card">
        <h1 className="text-3xl font-semibold text-slate-900">Register for Trusted Circle</h1>
        <p className="mt-3 text-slate-600">Create your account with email, password, and OTP verification for both phone and email.</p>

        <div className="mt-8 grid gap-6">
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Name</span>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your full name"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            />
          </label>

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
            <span className="text-sm font-medium text-slate-700">Phone Number</span>
            <input
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="+91 98765 43210"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Create a strong password"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Confirm Password</span>
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Repeat your password"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            />
          </label>

          {step === 'verify' ? (
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">OTP Code</span>
              <input
                type="text"
                value={otp}
                onChange={(event) => setOtp(event.target.value)}
                placeholder="123456"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
              />
            </label>
          ) : null}

          {message ? <p className="text-sm text-rose-600">{message}</p> : null}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {step === 'details' ? (
              <button
                type="button"
                onClick={sendOtp}
                disabled={sending}
                className="inline-flex items-center justify-center rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                {sending ? 'Sending OTP…' : 'Send OTP'}
              </button>
            ) : (
              <button
                type="button"
                onClick={verifyOtp}
                disabled={sending}
                className="inline-flex items-center justify-center rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                {sending ? 'Verifying…' : 'Verify OTP'}
              </button>
            )}
            <p className="text-sm text-slate-500">OTP is sent to both email and phone. Use <strong>123456</strong> for this demo.</p>
          </div>

          <p className="text-sm text-slate-600">
            Already registered?{' '}
            <Link href="/login" className="font-semibold text-brand-600 hover:text-brand-700">
              Login instead
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
