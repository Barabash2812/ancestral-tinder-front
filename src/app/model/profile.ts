import {User} from './user';

export class Profile {
  id: number;
  user: User;
  name: string;
  dateOfBirth: string;
  sex: string;
  about: string;
  lovers: Profile[];
  belovers: Profile[];
  match: boolean;
}
