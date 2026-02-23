'use client';

import { useState } from 'react';
import { store } from '@/lib/store';

interface CreatePostProps {
  userId: string;
  onPostCreated: () => void;
}

export default function CreatePost({ userId, onPostCreated }: CreatePostProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    try {
      await store.createPost(userId, title, content);
      setTitle('');
      setContent('');
      alert('게시글이 작성되었습니다!');
      onPostCreated();
    } catch (error: any) {
      alert(error.message || '게시글 작성에 실패했습니다.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">게시글 작성</h2>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            제목 *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            내용 *
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력하세요"
            rows={10}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary-blue text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium"
        >
          게시글 작성
        </button>
      </form>
    </div>
  );
}
