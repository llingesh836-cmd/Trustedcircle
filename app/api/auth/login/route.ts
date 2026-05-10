import { NextResponse } from 'next/server';
import { authenticateUser } from '../../../../lib/mockData';

export async function POST(request: Request) {
  const body = await request.json();
  const email = String(body?.email || '').trim();
  const password = String(body?.password || '').trim();

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
  }

  const user = authenticateUser(email, password);
  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
  }

  return NextResponse.json({ user: { name: user.name, email: user.email, phone: user.phone } });
}
