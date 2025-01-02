export interface SignupFormInputs {
  email: string;
  password: string;
  confirmPassword: string;
}
export interface ApiError {
  detail?: string;
  data?: {
    errors?: Record<string, string[]>;
  };
}
