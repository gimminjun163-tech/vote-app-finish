import { NextResponse } from 'next/server';
import { getPosts, savePosts, Post } from '@/lib/server-store';

// 게시글 목록 조회
export async function GET() {
  try {
    const posts = await getPosts();
    console.log('GET /api/posts - Total posts:', posts.length);
    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Get posts error:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

// 게시글 생성
export async function POST(request: Request) {
  try {
    const { authorId, title, content } = await request.json();
    
    if (!title?.trim() || !content?.trim()) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    console.log('POST /api/posts - Creating post:', title);

    const posts = await getPosts();
    const newPost: Post = {
      id: Date.now().toString(),
      authorId,
      title: title.trim(),
      content: content.trim(),
      createdAt: new Date().toISOString(),
      comments: [],
    };

    posts.unshift(newPost); // 최신순으로 추가
    await savePosts(posts);

    console.log('Post created successfully, total posts:', posts.length);
    return NextResponse.json({ post: newPost });
  } catch (error) {
    console.error('Create post error:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
