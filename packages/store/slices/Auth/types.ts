interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
}

interface LoginPayload {
  token: string;
}

export type { AuthState, LoginPayload };
