import { NextResponse } from 'next/server';
import { createUser, verifyOtpForContact } from '../../../../lib/mockData';

export async function POST(request: Request) {
  const body = await request.json();
  const phone = String(body?.phone || '').trim();
  const email = String(body?.email || '').trim();
  const otp = String(body?.otp || '').trim();
  const name = String(body?.name || '').trim();
  const password = String(body?.password || '').trim();

  if (!phone || !email || !otp || !name || !password) {
    return NextResponse.json({ error: 'All registration fields are required.' }, { status: 400 });
  }

  if (!verifyOtpForContact(phone, email, otp)) {
    return NextResponse.json({ error: 'Invalid OTP. Use 123456 in this demo.' }, { status: 401 });
  }

  const user = createUser({ phone, email, name, password, emailConfirmed: true });
  if (!user) {
    return NextResponse.json({ error: 'A user with this phone or email already exists. Please login.' }, { status: 400 });
  }

  return NextResponse.json({ user });
}
