import { Router, Request, Response, NextFunction } from 'express';
import AuthService from '../../services/auth';
import { IUser } from '../../interfaces/IUser';
import { IToken } from '../../interfaces/IToken';

const route = Router();
const authService = new AuthService();

route.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  const { password, name, email } = req.body;
  let newUser: IUser;
  try {
    newUser = await authService.createUser(email, name, password);
  } catch (e) {
    res.status(400);
    res.json({ message: e.message });
  }
  if (newUser) {
    res.status(201);
    res.json({ user: newUser });
  } else {
    res.status(400);
    res.json({ message: "error" });
  }
});

route.post('/signin', async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  let token: IToken;
  try {
    token = await authService.getUserToken(email, password);
  } catch (e) {
    console.log('error', e);
    // throw new Error(`could not get user, ${e}`);
  }
  if (!token) {
    return res.status(401).json({ message: "unable to login" });
  }
  return res.json(token).status(200);
});

export default route;
