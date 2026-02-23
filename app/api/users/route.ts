import { NextResponse } from 'next/server';
import { getUsers } from '@/lib/server-store';

// 모든 사용자 목록 조회 (비밀번호 제외)
export async function GET() {
  try {
    const users = await getUsers();
    console.log('GET /api/users - Total users:', users.length);
    // 비밀번호 제거
    const safeUsers = users.map(({ password, ...user }) => user);
    return NextResponse.json({ users: safeUsers });
  } catch (error) {
    console.error('Get users error:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}
