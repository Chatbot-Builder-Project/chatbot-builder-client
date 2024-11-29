import { User } from "../types";

interface SetUserReducer extends User {
  name: string;
  email: string;
  id: string;
}

export type { SetUserReducer as SetUser };
