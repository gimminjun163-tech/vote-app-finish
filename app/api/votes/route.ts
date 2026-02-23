import { NextResponse } from 'next/server';
import { getVotes, saveVotes, Vote } from '@/lib/server-store';

// 투표 목록 조회
export async function GET() {
  try {
    const votes = await getVotes();
    console.log('GET /api/votes - Total votes:', votes.length);
    return NextResponse.json({ votes });
  } catch (error) {
    console.error('Get votes error:', error);
    return NextResponse.json({ error: 'Failed to fetch votes' }, { status: 500 });
  }
}

// 투표 생성
export async function POST(request: Request) {
  try {
    const voteData = await request.json();
    console.log('POST /api/votes - Creating vote:', voteData.question);

    const votes = await getVotes();
    const newVote: Vote = {
      ...voteData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      responses: [],
    };

    votes.push(newVote);
    await saveVotes(votes);

    console.log('Vote created successfully, total votes:', votes.length);
    return NextResponse.json({ vote: newVote });
  } catch (error) {
    console.error('Create vote error:', error);
    return NextResponse.json({ error: 'Failed to create vote' }, { status: 500 });
  }
}
