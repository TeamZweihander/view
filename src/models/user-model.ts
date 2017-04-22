export class UserModel {
  public id: number;
  public name: string;
  public email: string;
  public profileImage: string;
  public password: string;

  constructor(id: number, name: string, email: string,  profileImage: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.profileImage = profileImage;
  }
}
