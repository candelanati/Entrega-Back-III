import { AdoptionModel } from '../models/adoption.model.js';

export class AdoptionRepository {
  constructor(model = AdoptionModel) {
    this.model = model;
  }

  getAll(filter = {}) {
    return this.model.find(filter).lean();
  }

  getBy(filter) {
    return this.model.findOne(filter).lean();
  }

  create(payload) {
    return this.model.create(payload);
  }
}
