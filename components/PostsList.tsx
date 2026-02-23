'use client';

import { useState, useEffect } from 'react';
import { Post, store } from '@/lib/store';
import PostCard from './PostCard';

interface PostsListProps {
  userId: string;
  onPostClick: (post: Post) => void;
}

export default function PostsList({ userId, onPostClick }: PostsListProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const allPosts = await store.getPosts();
    setPosts(allPosts);
    
    const allUsers = await store.getAllUsers();
    setUsers(allUsers);
  };

  const getUserName = (userId: string): string => {
    const user = users.find(u => u.id === userId);
    return user ? user.username : '알 수 없음';
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">자유게시판</h2>
      
      <div className="space-y-4">
        {posts.map(post => (
          <PostCard
            key={post.id}
            post={post}
            authorName={getUserName(post.authorId)}
            onClick={() => onPostClick(post)}
          />
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          아직 게시글이 없습니다. 첫 게시글을 작성해보세요!
        </div>
      )}
    </div>
  );
}
