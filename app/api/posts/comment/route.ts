import { NextResponse } from 'next/server';
import { getPosts, savePosts, Comment } from '@/lib/server-store';

export async function POST(request: Request) {
  try {
    const { postId, authorId, content } = await request.json();
    
    if (!content?.trim()) {
      return NextResponse.json({ error: 'Comment content is required' }, { status: 400 });
    }

    console.log('POST /api/posts/comment - Post:', postId);

    const posts = await getPosts();
    const post = posts.find(p => p.id === postId);

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const newComment: Comment = {
      id: Date.now().toString(),
      authorId,
      content: content.trim(),
      createdAt: new Date().toISOString(),
    };

    post.comments.push(newComment);
    await savePosts(posts);

    console.log('Comment added successfully');
    return NextResponse.json({ comment: newComment });
  } catch (error) {
    console.error('Add comment error:', error);
    return NextResponse.json({ error: 'Failed to add comment' }, { status: 500 });
  }
}
