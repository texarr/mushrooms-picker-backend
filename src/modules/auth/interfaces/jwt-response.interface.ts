import { User } from '../../user/user.entity';

export interface JwtResponseInterface {
  expiresIn: number;
  accessToken: string;
  id?: string;
  user?: User;
}
