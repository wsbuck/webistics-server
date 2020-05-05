import { IUser } from '../interfaces/IUser';
import { IToken } from '../interfaces/IToken';
import User from '../models/user';
import jwtConfig from '../config/jwt';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export interface IAuthService {
  createUser(email: string, name: string, password: string): Promise<IUser>;
  getUserToken(email: string, password: string): Promise<IToken>;
}

export default class AuthService implements IAuthService {
  constructor() {
  }

  async createUser(email: string, name: string, password: string): Promise<IUser> {
    const hash = await bcrypt.hash(password, 10);
    const user = new User({
      name: name,
      email: email,
      password: hash,
    });
    const newUser: IUser = await user.save();
    return newUser.toDTO();
  }

  async getUserToken(email: string, password: string): Promise<IToken> {
    const user = await User.findOne({ email: email });
    if (!user) {
      return null;
    }
    if(!await bcrypt.compare(password, user.password)) {
      return null;
    }
    let jwtToken = jwt.sign(
      {
        email: user.email,
        userId: user._id,
      },
      'secret',
      {
        expiresIn: '8hr',
      }
    );
    return {
      token: jwtToken,
      expiresIn: 3600 * 8,
      msg: user.toDTO(),
    };
  }
}
