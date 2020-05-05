import { IVisit } from '../interfaces/IVisit';
import Visit from '../models/visit';

export interface IVisitService {
  addVisit(ip: string): Promise<void>;
  getVisits(dateMax?: Date, dateMin?: Date): Promise<IVisit[]>;
}

export default class VisitService implements IVisitService {
  constructor() {
  }

  async addVisit(ip: string): Promise<void> {
    const visit = new Visit({ ip });
    await visit.save()
  }

  async getVisits(dateMax?: Date, dateMin?: Date): Promise<IVisit[]> {
    if (dateMax || dateMin) {
      return await Visit.find({ createdAt: { $gte: dateMin, $lte: dateMax }});
    }
    return await Visit.find();
  }

}
