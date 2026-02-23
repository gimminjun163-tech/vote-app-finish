import { NextResponse } from 'next/server';
import { getUsers, saveUsers, User } from '@/lib/server-store';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const users = await getUsers();
    
    // 중복 확인
    if (users.some(u => u.username === username)) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    const newUser: User = {
      id: Date.now().toString(),
      username,
      password,
      joinDate: new Date().toISOString(),
    };

    users.push(newUser);
    await saveUsers(users);

    return NextResponse.json({ user: newUser });
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json({ error: 'Failed to register' }, { status: 500 });
  }
}
