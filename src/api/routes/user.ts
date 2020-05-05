import { Router, Request, Response } from 'express';
import middlewares from '../middlewares';

const route = Router();

route.get('/me', middlewares.isAuth, middlewares.attachCurrentUser, (req: Request, resp: Response) => {
  return resp.json({ user: req.currentUser }).status(200);
});

export default route;
