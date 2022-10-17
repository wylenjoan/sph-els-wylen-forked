export interface UserCreation {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  is_admin: boolean;
  avatar_url?: string;
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  is_admin: boolean;
  avatar_url?: string;
}

export interface UserProfile {
  id: number;
  first_name: string;
  last_name: string;
  avatar_url?: string;
}
export interface Follower {
  id: number,
  follower_id: number,
  follower_user_name: string,
}

export interface Following {
  id: number,
  following_id: number,
  following_user_name: string,
}

export interface UserProfileRelations {
  id: number,
  full_name: string,
  avatar_url?: string,
  following_number: number,
  following_relation: Following[],
  follower_number: number,
  follower_relation: Follower[],
}
