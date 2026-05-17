export type UserRole = "MEMBER" | "ADMIN";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage?: string;
  bio?: string;
  isActive: boolean;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  createdAt: string;
}

export type IdeaStatus = "DRAFT" | "PENDING" | "UNDER_REVIEW" | "APPROVED" | "REJECTED";

export interface Idea {
  id: string;
  title: string;
  problemStatement: string;
  proposedSolution: string;
  description: string;
  images: string[];
  isPaid: boolean;
  price?: number;
  status: IdeaStatus;
  rejectionFeedback?: string;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  author: {
    id: string;
    name: string;
    profileImage?: string;
  };
  category: Category;
  _count?: {
    votes: number;
    comments: number;
  };
  votes?: Vote[];
}

export type VoteType = "UPVOTE" | "DOWNVOTE";

export interface Vote {
  id: string;
  type: VoteType;
  userId: string;
  ideaId: string;
}

export interface Comment {
  id: string;
  content: string;
  isDeleted: boolean;
  createdAt: string;
  userId: string;
  ideaId: string;
  parentId?: string;
  user: {
    id: string;
    name: string;
    profileImage?: string;
  };
  replies?: Comment[];
}

export interface Review {
  id: string;
  rating: number;
  experience: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    profileImage?: string;
  };
}

export interface Payment {
  id: string;
  amount: number;
  status: string;
  transactionId?: string;
  createdAt: string;
  ideaId: string;
  userId: string;
}