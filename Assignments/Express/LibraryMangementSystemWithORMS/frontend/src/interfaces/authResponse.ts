export interface AuthResponse {
  token: string;
  user: {
      id: number;
      email: string;
      username: string;
      role_id:number
  };
}
