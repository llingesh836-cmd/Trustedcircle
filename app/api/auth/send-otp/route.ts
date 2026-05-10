import { NextResponse } from 'next/server';
import { otpStore } from '../../../../lib/mockData';

export async function POST(request: Request) {
  const body = await request.json();
  const phone = String(body?.phone || '').trim();

  if (!phone) {
    return NextResponse.json({ error: 'Phone number is required.' }, { status: 400 });
  }

  otpStore[phone] = '123456';
  return NextResponse.json({ success: true, message: 'OTP sent successfully.', otp: '123456' });
}
