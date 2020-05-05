export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  salt: string;
  toDTO(): any;
}

export interface IUserDTO {
  name: string;
  email: string;
  password: string;
}
