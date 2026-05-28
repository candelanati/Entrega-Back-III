import { PetModel } from '../models/pet.model.js';

export class PetRepository {
  constructor(model = PetModel) {
    this.model = model;
  }

  getBy(filter) {
    return this.model.findOne(filter);
  }

  update(id, payload) {
    return this.model.findByIdAndUpdate(id, { $set: payload }, { new: true });
  }
}
