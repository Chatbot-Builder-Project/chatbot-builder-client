export interface QueryError {
  detail: string;
  status: number;
  title: string;
  type: string;
  error?: {
    status?: number;
  };
}
