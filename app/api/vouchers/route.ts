import { NextResponse } from 'next/server';
import { vouchers } from '../../../lib/mockData';

export async function GET() {
  return NextResponse.json({ vouchers });
}
