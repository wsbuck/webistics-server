import { IUser } from './IUser';

export interface IToken {
  token: string;
  expiresIn: number;
  msg: IUser,
};
