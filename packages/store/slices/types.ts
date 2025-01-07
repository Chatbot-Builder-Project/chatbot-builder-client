interface User {
  readonly email: string | null;
  readonly name: string | null;
  readonly id: string | null;
  readonly isEmailConfirmed: boolean | null;
  isAuthenticated: boolean;
}

export type { User };
