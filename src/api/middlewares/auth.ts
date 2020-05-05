import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import jwtConfig from '../../config/jwt';

const isAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, jwtConfig.jwtSecret);
    next();
  } catch (e) {
    res.status(401).json({ message: "Authentication failed" });
  }
}

export default isAuth;
