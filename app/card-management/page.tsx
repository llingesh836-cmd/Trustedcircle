'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Card = {
  id: string;
  cardholder: string;
  number: string;
  expiry: string;
  brand: string;
};

const maskNumber = (cardNumber: string) => {
  const digits = cardNumber.replace(/\D/g, '');
  return digits.length >= 4 ? `**** **** **** ${digits.slice(-4)}` : cardNumber;
};

export default function CardManagementPage() {
  const [cards, setCards] = useState<Card[]>([]);
  const [cardholder, setCardholder] = useState('');
  const [number, setNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [brand, setBrand] = useState('Visa');
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('trustedcircle-cards') : null;
    if (stored) {
      setCards(JSON.parse(stored));
    }
  }, []);

  const saveCards = (updated: Card[]) => {
    setCards(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('trustedcircle-cards', JSON.stringify(updated));
    }
  };

  const handleAddCard = (event: React.FormEvent) => {
    event.preventDefault();
    setMessage(null);

    if (!cardholder || !number || !expiry) {
      setMessage('Please complete all card fields before saving.');
      return;
    }

    if (number.replace(/\D/g, '').length < 12) {
      setMessage('Enter a valid card number.');
      return;
    }

    const newCard: Card = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      cardholder,
      number,
      expiry,
      brand,
    };
    saveCards([...cards, newCard]);
    setCardholder('');
    setNumber('');
    setExpiry('');
    setBrand('Visa');
    setMessage('Card added successfully.');
  };

  const handleRemove = (id: string) => {
    const updated = cards.filter((card) => card.id !== id);
    saveCards(updated);
  };

  return (
    <div className="min-h-[80vh] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-card">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Card Management</p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-900">Save payment cards for quick checkout</h1>
              <p className="mt-3 text-slate-600">Add card details to local storage and manage your saved cards inside the app.</p>
            </div>
            <Link href="/" className="inline-flex items-center justify-center rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-600">
              Go Home
            </Link>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-card">
            <h2 className="text-xl font-semibold text-slate-900">Add a new card</h2>
            <p className="mt-3 text-sm text-slate-600">This is a mock card manager for faster checkout and saved payment details.</p>
            <form onSubmit={handleAddCard} className="mt-8 space-y-5">
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Cardholder Name</span>
                <input
                  value={cardholder}
                  onChange={(event) => setCardholder(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                  placeholder="Name on card"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Card Number</span>
                <input
                  value={number}
                  onChange={(event) => setNumber(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                  placeholder="1234 5678 9012 3456"
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">Expiry</span>
                  <input
                    value={expiry}
                    onChange={(event) => setExpiry(event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                    placeholder="MM/YY"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">Brand</span>
                  <select
                    value={brand}
                    onChange={(event) => setBrand(event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                  >
                    <option>Visa</option>
                    <option>Mastercard</option>
                    <option>RuPay</option>
                    <option>Amex</option>
                  </select>
                </label>
              </div>

              {message ? <p className="text-sm text-brand-600">{message}</p> : null}

              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
              >
                Save card
              </button>
            </form>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-card">
            <h2 className="text-xl font-semibold text-slate-900">Saved cards</h2>
            <p className="mt-3 text-sm text-slate-600">Manage your saved payment methods for a smoother purchase experience.</p>
            <div className="mt-6 space-y-4">
              {cards.length === 0 ? (
                <p className="text-sm text-slate-600">No cards saved yet. Add a card to enable quick checkout.</p>
              ) : (
                cards.map((card) => (
                  <div key={card.id} className="rounded-3xl border border-slate-200 bg-white p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{card.brand}</p>
                        <p className="text-sm text-slate-600">{maskNumber(card.number)}</p>
                        <p className="text-sm text-slate-600">{card.cardholder}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemove(card.id)}
                        className="rounded-full border border-slate-200 px-3 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
                      >
                        Remove
                      </button>
                    </div>
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
