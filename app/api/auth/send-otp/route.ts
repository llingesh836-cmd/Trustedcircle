import { NextResponse } from 'next/server';
import { storeOtpForContact } from '../../../../lib/mockData';

export async function POST(request: Request) {
  const body = await request.json();
  const phone = String(body?.phone || '').trim();
  const email = String(body?.email || '').trim();

  if (!phone || !email) {
    return NextResponse.json({ error: 'Both email and phone are required for OTP delivery.' }, { status: 400 });
  }

  const otp = '123456';
  storeOtpForContact(phone, email, otp);
  return NextResponse.json({ success: true, message: 'OTP sent to phone and email.', otp });
}
