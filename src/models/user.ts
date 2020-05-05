import mongoose from 'mongoose';
import { IUser } from '../interfaces/IUser';
import uniqueValidator from 'mongoose-unique-validator';


const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      index: true,
    },
    password: String,
    salt: String,
    role: {
      type: String,
      default: 'user',
    },
  },
  { timestamps: true }
);

User.methods.toDTO = function() {
  const obj = this.toObject();
  return {
    email: obj.email,
    name: obj.name,
    role: obj.role,
  };
}

User.plugin(uniqueValidator, { message: 'Email already in use.' });
export default mongoose.model<IUser & mongoose.Document>('User', User);
