import {Profile} from './profile';

export class User {
  id: number;
  username: string;
  password: string;
  isActive: boolean;
  email: string;
  activationCode: string;
  profile: Profile;
}
