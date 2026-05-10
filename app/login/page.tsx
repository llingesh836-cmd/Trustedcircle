'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'details' | 'verify'>('details');
  const [message, setMessage] = useState<string | null>(null);

  const sendOtp = async () => {
    if (!phone) {
      setMessage('Please enter your phone number.');
      return;
    }
    const response = await fetch('/api/auth/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone }),
    });
    const data = await response.json();
    if (response.ok) {
      setStep('verify');
      setMessage('OTP sent. Use 123456 to verify in this mock flow.');
    } else {
      setMessage(data.error ?? 'Unable to send OTP.');
    }
  };

  const verifyOtp = async () => {
    if (!otp) {
      setMessage('Please enter the OTP.');
      return;
    }
    const response = await fetch('/api/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, otp, name, email }),
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('trustedcircle-user', JSON.stringify(data.user));
      router.push('/profile');
    } else {
      setMessage(data.error ?? 'OTP verification failed.');
    }
  };

  return (
    <div className="min-h-[80vh] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 shadow-card">
        <h1 className="text-3xl font-semibold text-slate-900">Login or Register</h1>
        <p className="mt-3 text-slate-600">Enter your details and authenticate using a mock OTP.</p>

        <div className="mt-8 grid gap-6">
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Name</span>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
              placeholder="Your full name"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
              placeholder="you@example.com"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Phone Number</span>
            <input
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
              placeholder="+91 98765 43210"
            />
          </label>

          {step === 'verify' ? (
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">OTP Code</span>
              <input
                type="text"
                value={otp}
                onChange={(event) => setOtp(event.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                placeholder="123456"
              />
            </label>
          ) : null}

          {message ? <p className="text-sm text-rose-600">{message}</p> : null}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {step === 'details' ? (
              <button
                type="button"
                onClick={sendOtp}
                className="inline-flex items-center justify-center rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
              >
                Send OTP
              </button>
            ) : (
              <button
                type="button"
                onClick={verifyOtp}
                className="inline-flex items-center justify-center rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
              >
                Verify OTP
              </button>
            )}
            <p className="text-sm text-slate-500">Mock OTP for this demo: <strong>123456</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
}
