import { Router, Request, Response } from 'express';
import isAuth from '../middlewares/auth';
import VisitService from '../../services/visit';
import { IVisit } from '../../interfaces/IVisit';

const route = Router();
const visitService = new VisitService();

route.get('/', isAuth, async (req: Request, res: Response) => {
  let visits: null | IVisit[] = null
  try {
    visits = await visitService.getVisits();
  } catch (e) {
    console.log('error', e);
    res.status(400).json({ message: "error occurred" });
  }
  res.status(200).json({ visits });
});

route.post('/', async (req: Request, res: Response) => {
  const { ip } = req.body;
  try {
    await visitService.addVisit(ip);
  } catch (e) {
    console.log('error', e);
    res.status(400).json({ message: "something went wrong" });
  }
  res.status(201).json({ message: "created" });
});

export default route;
