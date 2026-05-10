import { NextResponse } from 'next/server';
import { createOrder, createUser } from '../../../../lib/mockData';

export async function POST(request: Request) {
  const body = await request.json();
  const voucherId = String(body?.voucherId || '').trim();
  const amount = Number(body?.amount) as 100 | 500 | 1000;
  const quantity = Number(body?.quantity) || 1;
  const userPhone = String(body?.userPhone || '').trim();
  const userName = String(body?.userName || 'Guest').trim();
  const userEmail = String(body?.userEmail || '').trim();

  if (!voucherId || !userPhone) {
    return NextResponse.json({ error: 'Voucher selection and user details are required.' }, { status: 400 });
  }

  createUser({ phone: userPhone, name: userName, email: userEmail });
  const result = createOrder({ voucherId, amount, quantity, userPhone, userName, userEmail });

  if ('error' in result) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ order: result });
}
