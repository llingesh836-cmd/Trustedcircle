import crypto from 'crypto';
import { NextResponse } from 'next/server';
import { verifyPaymentForOrder } from '@/lib/mockData';

const keySecret = process.env.RAZORPAY_KEY_SECRET ?? '';

export async function POST(request: Request) {
  if (!keySecret) {
    return NextResponse.json({ error: 'Razorpay key secret is not configured. Please set RAZORPAY_KEY_SECRET.' }, { status: 500 });
  }
  const body = await request.json();
  const orderId = String(body?.orderId ?? '').trim();
  const razorpayPaymentId = String(body?.razorpay_payment_id ?? '').trim();
  const razorpayOrderId = String(body?.razorpay_order_id ?? '').trim();
  const razorpaySignature = String(body?.razorpay_signature ?? '').trim();

  if (!orderId || !razorpayPaymentId || !razorpayOrderId || !razorpaySignature) {
    return NextResponse.json({ error: 'orderId, razorpay_payment_id, razorpay_order_id and razorpay_signature are required.' }, { status: 400 });
  }

  const expectedSignature = crypto
    .createHmac('sha256', keySecret)
    .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    .digest('hex');

  const receivedSignature = Buffer.from(razorpaySignature, 'utf8');
  const expectedBuffer = Buffer.from(expectedSignature, 'utf8');
  const signatureMatches =
    receivedSignature.length === expectedBuffer.length &&
    crypto.timingSafeEqual(receivedSignature, expectedBuffer);

  if (!signatureMatches) {
    return NextResponse.json({ error: 'Payment signature verification failed.' }, { status: 400 });
  }

  const result = verifyPaymentForOrder(orderId);
  if ('error' in result) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ success: true, paymentId: razorpayPaymentId, orderId: razorpayOrderId, order: result }, { status: 200 });
}
