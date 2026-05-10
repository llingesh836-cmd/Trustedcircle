import { NextResponse } from 'next/server';
import { getOrdersForPhone } from '../../../lib/mockData';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const phone = url.searchParams.get('phone');
  const orders = phone ? getOrdersForPhone(phone) : [];
  return NextResponse.json({ orders });
}
