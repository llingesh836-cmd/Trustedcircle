import { NextResponse } from 'next/server';
import { getOrderById } from '../../../../lib/mockData';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const order = getOrderById(params.id);
  if (!order) {
    return NextResponse.json({ error: 'Order not found.' }, { status: 404 });
  }
  return NextResponse.json({ order });
}
