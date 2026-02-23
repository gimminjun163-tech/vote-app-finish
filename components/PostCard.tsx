'use client';

import { Post } from '@/lib/store';

interface PostCardProps {
  post: Post;
  authorName: string;
  onClick: () => void;
}

export default function PostCard({ post, authorName, onClick }: PostCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return '방금 전';
    if (minutes < 60) return `${minutes}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    if (days < 7) return `${days}일 전`;
    
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer p-6 border-2 border-gray-100 hover:border-primary-blue"
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
        {post.title}
      </h3>
      
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {post.content}
      </p>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-blue via-primary-purple to-primary-yellow flex items-center justify-center text-white text-xs font-bold">
            {authorName.charAt(0).toUpperCase()}
          </div>
          <span>{authorName}</span>
        </div>
        
        <div className="flex items-center gap-4">
          <span>💬 {post.comments.length}</span>
          <span>{formatDate(post.createdAt)}</span>
        </div>
      </div>
    </div>
  );
}
