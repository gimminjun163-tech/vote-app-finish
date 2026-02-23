'use client';

import { Vote } from '@/lib/store';

interface VoteCardProps {
  vote: Vote;
  hasVoted: boolean;
  isExpired: boolean;
  creatorName: string;
  onClick: () => void;
}

export default function VoteCard({ vote, hasVoted, isExpired, creatorName, onClick }: VoteCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
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
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 flex-1">
          {vote.question}
        </h3>
      </div>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-blue via-primary-purple to-primary-yellow flex items-center justify-center text-white text-xs font-bold">
          {creatorName.charAt(0).toUpperCase()}
        </div>
        <span className="text-sm text-gray-600">{creatorName}</span>
      </div>
      <div className="space-y-2 text-sm text-gray-600">
        <p>선택지: {vote.options.length}개{vote.hasOther && ' + 기타'}</p>
        <p>
          선택 방식: {vote.selectionType === 'fixed' 
            ? `${vote.selectionCount}개 선택` 
            : '복수 선택'}
        </p>
        <p>응답: {vote.responses.length}명</p>
        {vote.deadline && (
          <p className={isExpired ? 'text-red-500' : 'text-green-600'}>
            마감: {formatDate(vote.deadline)} {isExpired && '(마감됨)'}
          </p>
        )}
      </div>
      <div className="mt-4 flex items-center space-x-2">
        {hasVoted && (
          <span className="px-3 py-1 bg-primary-yellow text-white text-xs rounded-full">
            참여 완료
          </span>
        )}
        {isExpired && (
          <span className="px-3 py-1 bg-gray-400 text-white text-xs rounded-full">
            마감됨
          </span>
        )}
      </div>
    </div>
  );
}
