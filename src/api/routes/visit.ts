import { Router, Request, Response, response } from 'express';
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

route.get('/daily/:days', isAuth, async (req: Request, res: Response) => {
  const days: number = parseInt(req.params.days) || 7;
  const maxDate = new Date();
  let minDate = new Date();
  let visits: null | IVisit[];
  minDate.setDate(minDate.getDate() - days);
  try {
    visits = await visitService.getVisits(maxDate, minDate);
  } catch (e) {
    console.log('error', e);
    res.status(400).json({ message: 'error occurred' });
  }
  const dateMap = {};
  for (let i = 0; i < days; i++) {
    let d = new Date();
    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);
    d.setMilliseconds(0);
    dateMap[d.setDate(d.getDate() - i)] = 0;
  }
  visits.forEach((visit) => {
    const date = new Date(visit.createdAt);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    const time = date.getTime();
    dateMap[time] += 1;
  });
  // res.status(200).json({ data: [Object.keys(dateMap), Object.values(dateMap)] });
  res.status(200).json({ labels: Object.keys(dateMap), data: Object.values(dateMap) });
  
});

route.get('/stream', isAuth, (req: Request, res: Response) => {
  visitService.getVisitsStream(res);
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
