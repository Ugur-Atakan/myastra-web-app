import { Tokens } from "./user";

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