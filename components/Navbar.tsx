'use client';

interface NavbarProps {
  username: string;
  onLogout: () => void;
  onProfileClick: () => void;
}

export default function Navbar({ username, onLogout, onProfileClick }: NavbarProps) {
  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <h1 className="rainbow-text text-2xl cursor-default">
              Vote
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onProfileClick}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-primary-blue via-primary-purple to-primary-yellow text-white font-bold hover:opacity-80 transition-opacity"
            >
              {username.charAt(0).toUpperCase()}
            </button>
            <button
              onClick={onLogout}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              로그아웃
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
