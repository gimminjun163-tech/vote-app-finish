import { kv } from '@vercel/kv';

export interface User {
  id: string;
  username: string;
  password: string;
  joinDate: string;
}

export interface Vote {
  id: string;
  creatorId: string;
  question: string;
  options: string[];
  hasOther: boolean;
  selectionType: 'fixed' | 'multiple';
  selectionCount?: number;
  deadline?: string;
  createdAt: string;
  responses: VoteResponse[];
}

export interface VoteResponse {
  userId: string;
  selectedOptions: number[];
  otherText?: string;
  timestamp: string;
}

export interface Post {
  id: string;
  authorId: string;
  title: string;
  content: string;
  createdAt: string;
  comments: Comment[];
}

export interface Comment {
  id: string;
  authorId: string;
  content: string;
  createdAt: string;
}

const USERS_KEY = 'vote_app:users';
const VOTES_KEY = 'vote_app:votes';
const POSTS_KEY = 'vote_app:posts';

export async function getUsers(): Promise<User[]> {
  try {
    const users = await kv.get<User[]>(USERS_KEY);
    return users || [];
  } catch (error) {
    console.error('KV getUsers error:', error);
    return [];
  }
}

export async function saveUsers(users: User[]): Promise<void> {
  try {
    await kv.set(USERS_KEY, users);
  } catch (error) {
    console.error('KV saveUsers error:', error);
    throw error;
  }
}

export async function getVotes(): Promise<Vote[]> {
  try {
    const votes = await kv.get<Vote[]>(VOTES_KEY);
    return votes || [];
  } catch (error) {
    console.error('KV getVotes error:', error);
    return [];
  }
}

export async function saveVotes(votes: Vote[]): Promise<void> {
  try {
    await kv.set(VOTES_KEY, votes);
  } catch (error) {
    console.error('KV saveVotes error:', error);
    throw error;
  }
}

export async function getPosts(): Promise<Post[]> {
  try {
    const posts = await kv.get<Post[]>(POSTS_KEY);
    return posts || [];
  } catch (error) {
    console.error('KV getPosts error:', error);
    return [];
  }
}

export async function savePosts(posts: Post[]): Promise<void> {
  try {
    await kv.set(POSTS_KEY, posts);
  } catch (error) {
    console.error('KV savePosts error:', error);
    throw error;
  }
}
