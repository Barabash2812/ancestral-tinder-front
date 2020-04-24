import {Profile} from './profile';

export class ProfileDto {
  name: string;
  dateOfBirth: string;
  sex: string;
  about: string;

  constructor(name: string, dateOfBirth: string, sex: string, about: string) {
    this.name = name;
    this.dateOfBirth = dateOfBirth;
    this.sex = sex;
    this.about = about;
  }

  recover(profile: Profile) {
    if (this.name === null) {
      this.name = profile.name;
    }
    if (this.dateOfBirth === null) {
      this.dateOfBirth = profile.dateOfBirth;
    }
    if (this.sex === null) {
      this.sex = profile.sex;
    }
    if (this.about === null) {
      this.about = profile.about;
    }
  }

}
