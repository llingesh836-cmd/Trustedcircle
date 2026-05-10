import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const keyId = process.env.RAZORPAY_KEY_ID ?? '';
const keySecret = process.env.RAZORPAY_KEY_SECRET ?? '';

const createRazorpayClient = () => {
  if (!keyId || !keySecret) {
    throw new Error('Razorpay API credentials are not configured. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.');
  }

  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const amount = Number(body?.amount ?? 0);
    const currency = String(body?.currency ?? 'INR').toUpperCase();
    const receipt = String(body?.receipt ?? '').trim();

    if (!amount || amount < 100) {
      return NextResponse.json({ error: 'Amount must be at least 100 paise.' }, { status: 400 });
    }

    if (!receipt) {
      return NextResponse.json({ error: 'Receipt is required.' }, { status: 400 });
    }

    if (currency !== 'INR') {
      return NextResponse.json({ error: 'Only INR currency is supported.' }, { status: 400 });
    }

    const razorpay = createRazorpayClient();
    const order = await razorpay.orders.create({
      amount,
      currency,
      receipt,
    });

    return NextResponse.json(
      {
        order_id: order.id,
        amount: order.amount,
        currency: order.currency,
      },
      { status: 200 }
    );
  } catch (error: any) {
    const message = error?.error?.description || error?.message || 'Failed to create Razorpay order.';
    const status = error?.statusCode === 401 ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
