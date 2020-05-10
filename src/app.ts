import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cors from 'cors';

dotenv.config();

import authRouter from './api/routes/auth';
import visitRouter from './api/routes/visit';
import dbconfig from './config/database';

mongoose.connect(dbconfig.url);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/auth', authRouter);
app.use('/visit', visitRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`listening on port: ${port}`));
