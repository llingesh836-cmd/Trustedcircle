import { NextResponse } from 'next/server';
import { verifyPaymentForOrder } from '../../../../lib/mockData';

export async function POST(request: Request) {
  const body = await request.json();
  const orderId = String(body?.orderId || '').trim();
  if (!orderId) {
    return NextResponse.json({ error: 'Order ID is required.' }, { status: 400 });
  }

  const result = verifyPaymentForOrder(orderId);
  if ('error' in result) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  return NextResponse.json({ order: result });
}
