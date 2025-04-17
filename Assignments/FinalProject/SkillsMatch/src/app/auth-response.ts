export interface AuthResponse {
  token: string;
  user: {
      id: number;
      email: string;
      user_type: string;
  };
}
