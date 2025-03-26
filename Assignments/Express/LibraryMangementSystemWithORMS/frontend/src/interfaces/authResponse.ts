export interface AuthResponse {
  token: string;
  user: {
      id: number;
      email: string;
      name: string;
      role_id:number
  };
}
