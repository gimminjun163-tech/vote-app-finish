'use client';

import { useState, useEffect } from 'react';
import { User, Vote, Post, store } from '@/lib/store';
import Auth from '@/components/Auth';
import Navbar from '@/components/Navbar';
import CreateVote from '@/components/CreateVote';
import VotesList from '@/components/VotesList';
import VoteDetail from '@/components/VoteDetail';
import CreatePost from '@/components/CreatePost';
import PostsList from '@/components/PostsList';
import PostDetail from '@/components/PostDetail';
import Profile from '@/components/Profile';

type Tab = 'votes' | 'create-vote' | 'posts' | 'create-post';
type View = 'list' | 'detail' | 'profile';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('votes');
  const [currentView, setCurrentView] = useState<View>('list');
  const [selectedVote, setSelectedVote] = useState<Vote | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    const currentUser = store.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    store.setCurrentUser(loggedInUser);
  };

  const handleLogout = () => {
    setUser(null);
    store.setCurrentUser(null);
    setActiveTab('votes');
    setCurrentView('list');
  };

  const handleVoteClick = (vote: Vote) => {
    setSelectedVote(vote);
    setCurrentView('detail');
  };

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    setCurrentView('detail');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedVote(null);
    setSelectedPost(null);
  };

  const handleVoteCreated = () => {
    setActiveTab('votes');
    setCurrentView('list');
  };

  const handlePostCreated = () => {
    setActiveTab('posts');
    setCurrentView('list');
  };

  const handleProfileClick = () => {
    setCurrentView('profile');
  };

  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar 
        username={user.username} 
        onLogout={handleLogout}
        onProfileClick={handleProfileClick}
      />
      
      {currentView === 'profile' ? (
        <Profile user={user} onBack={handleBackToList} />
      ) : currentView === 'detail' && selectedVote ? (
        <VoteDetail 
          vote={selectedVote} 
          userId={user.id}
          onBack={handleBackToList}
        />
      ) : currentView === 'detail' && selectedPost ? (
        <PostDetail 
          post={selectedPost} 
          userId={user.id}
          onBack={handleBackToList}
        />
      ) : (
        <>
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex space-x-2 mb-6">
              <button
                onClick={() => { setActiveTab('votes'); setCurrentView('list'); }}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === 'votes'
                    ? 'bg-primary-blue text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                투표들
              </button>
              <button
                onClick={() => { setActiveTab('create-vote'); setCurrentView('list'); }}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === 'create-vote'
                    ? 'bg-primary-blue text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                투표 만들기
              </button>
              <button
                onClick={() => { setActiveTab('posts'); setCurrentView('list'); }}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === 'posts'
                    ? 'bg-primary-purple text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                자유게시판
              </button>
              <button
                onClick={() => { setActiveTab('create-post'); setCurrentView('list'); }}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === 'create-post'
                    ? 'bg-primary-purple text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                게시글 작성
              </button>
            </div>
          </div>

          {activeTab === 'votes' && (
            <VotesList userId={user.id} onVoteClick={handleVoteClick} />
          )}
          {activeTab === 'create-vote' && (
            <CreateVote userId={user.id} onVoteCreated={handleVoteCreated} />
          )}
          {activeTab === 'posts' && (
            <PostsList userId={user.id} onPostClick={handlePostClick} />
          )}
          {activeTab === 'create-post' && (
            <CreatePost userId={user.id} onPostCreated={handlePostCreated} />
          )}
        </>
      )}
    </div>
  );
}
