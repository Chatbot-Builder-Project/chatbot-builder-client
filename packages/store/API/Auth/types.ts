interface AuthCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  tokenType: string;
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
}

export type { AuthCredentials, AuthResponse };
