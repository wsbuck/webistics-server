import mongoose from 'mongoose';
import { IVisit } from '../interfaces/IVisit';

const Visit = new mongoose.Schema(
  {
    ip: {
      type: String,
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IVisit & mongoose.Document>('Visit', Visit);
