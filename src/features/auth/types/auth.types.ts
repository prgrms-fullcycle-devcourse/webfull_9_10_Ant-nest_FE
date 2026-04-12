export interface SignupRequest {
  email: string;
  nickname: string;
  password: string;
  checkPassword: string;
}

export interface SignupResponse {
  userId: null | number;
}

export interface LoginRequest {
  email: string;
  password: string;
  // autoLogin?: boolean;
}

export interface LoginResponse {
  userId: number;
  nickname: string;
  accessToken: string;
}
