import { NextResponse } from 'next/server';
import { getUsers } from '@/lib/server-store';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    
    console.log('Login attempt:', username);

    const users = await getUsers();
    console.log('Total users:', users.length);
    
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Failed to login' }, { status: 500 });
  }
}
