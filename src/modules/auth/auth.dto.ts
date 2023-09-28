import { Auth } from 'src/models/auth.model';

export interface SignInPayload {
  username: string;
  password: string;
}
export type SignInResponse = Auth;
