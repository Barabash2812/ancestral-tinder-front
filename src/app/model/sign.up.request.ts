export class SignUpRequest {
  username: string;
  password: string;
  email: string;
  name: string;
  dateOfBirth: string;
  sex: string;
  about: string;


  constructor(username: string, password: string, email: string, name: string, dateOfBirth: string, sex: string, about: string) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.name = name;
    this.dateOfBirth = dateOfBirth;
    this.sex = sex;
    this.about = about;
  }
}
