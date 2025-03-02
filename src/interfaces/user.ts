export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
}

export type AuthUser = {
  id: string;
  email?: string;
  user_metadata?: {
    first_name?: string;
    last_name?: string;
  };
};
