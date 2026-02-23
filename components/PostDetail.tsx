'use client';

import { useState, useEffect } from 'react';
import { Post, store } from '@/lib/store';

interface PostDetailProps {
  post: Post;
  userId: string;
  onBack: () => void;
}

export default function PostDetail({ post, userId, onBack }: PostDetailProps) {
  const [commentContent, setCommentContent] = useState('');
  const [currentPost, setCurrentPost] = useState(post);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const allUsers = await store.getAllUsers();
    setUsers(allUsers);
  };

  const getUserName = (userId: string): string => {
    const user = users.find(u => u.id === userId);
    return user ? user.username : '알 수 없음';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!commentContent.trim()) {
      alert('댓글 내용을 입력해주세요.');
      return;
    }

    try {
      await store.addComment(currentPost.id, userId, commentContent);
      
      // 게시글 새로고침
      const posts = await store.getPosts();
      const updated = posts.find(p => p.id === currentPost.id);
      if (updated) {
        setCurrentPost(updated);
      }
      
      setCommentContent('');
    } catch (error: any) {
      alert(error.message || '댓글 작성에 실패했습니다.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={onBack}
        className="mb-4 px-4 py-2 text-primary-blue hover:bg-blue-50 rounded-lg transition-colors"
      >
        ← 목록으로
      </button>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          {currentPost.title}
        </h1>

        <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-blue via-primary-purple to-primary-yellow flex items-center justify-center text-white font-bold">
            {getUserName(currentPost.authorId).charAt(0).toUpperCase()}
          </div>
          <span>{getUserName(currentPost.authorId)}</span>
          <span>•</span>
          <span>{formatDate(currentPost.createdAt)}</span>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
            {currentPost.content}
          </p>
        </div>
      </div>

      {/* 댓글 섹션 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          댓글 {currentPost.comments.length}
        </h2>

        {/* 댓글 작성 */}
        <form onSubmit={handleCommentSubmit} className="mb-6">
          <textarea
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            placeholder="댓글을 입력하세요"
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue resize-none mb-2"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-primary-blue text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              댓글 작성
            </button>
          </div>
        </form>

        {/* 댓글 목록 */}
        <div className="space-y-4">
          {currentPost.comments.map(comment => (
            <div key={comment.id} className="border-l-4 border-gray-200 pl-4 py-2">
              <div className="flex items-center gap-2 mb-2 text-sm">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-blue via-primary-purple to-primary-yellow flex items-center justify-center text-white text-xs font-bold">
                  {getUserName(comment.authorId).charAt(0).toUpperCase()}
                </div>
                <span className="font-medium text-gray-700">
                  {getUserName(comment.authorId)}
                </span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-400 text-xs">
                  {formatDate(comment.createdAt)}
                </span>
              </div>
              <p className="text-gray-700">{comment.content}</p>
            </div>
          ))}

          {currentPost.comments.length === 0 && (
            <p className="text-center py-8 text-gray-400">
              첫 댓글을 작성해보세요!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
