import { Tokens } from "./user";

export interface User {
  id: string;
  fullName: string;
  email: string;
  roles: string[];
  createdAt: any;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}



export interface UserResponse {
  user: User;
  tokens: Tokens;
}