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
