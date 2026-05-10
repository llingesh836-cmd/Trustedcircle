import { NextResponse } from 'next/server';
import { createUser, otpStore } from '../../../../lib/mockData';

export async function POST(request: Request) {
  const body = await request.json();
  const phone = String(body?.phone || '').trim();
  const otp = String(body?.otp || '').trim();
  const name = String(body?.name || 'Guest').trim();
  const email = String(body?.email || '').trim();

  if (!phone || !otp) {
    return NextResponse.json({ error: 'Phone and OTP are required.' }, { status: 400 });
  }

  const savedOtp = otpStore[phone];
  if (otp !== '123456' || savedOtp !== '123456') {
    return NextResponse.json({ error: 'Invalid OTP. Use 123456 in this demo.' }, { status: 401 });
  }

  const user = createUser({ phone, name, email });
  return NextResponse.json({ user });
}
