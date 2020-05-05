import mongoose from 'mongoose';
import { Request, Response } from 'express';
import { IUser } from '../../interfaces/IUser';
import userModel from '../../models/user';

const attachCurrentUser = async (req: any, res: any, next: any) => {
  try {
    const userRecord = await userModel.findById(req.token._id);
    if (!userRecord) {
      return res.sendStatus(401);
    }
    const currentUser = userRecord.toObject();
    Reflect.deleteProperty(currentUser, 'password');
    Reflect.deleteProperty(currentUser, 'salt');
    req.currentUser = currentUser;
    return next();
  } catch (e) {
    console.error('error matching user to req');
    return next();
  }
};

export default attachCurrentUser;
