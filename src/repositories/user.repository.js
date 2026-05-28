import { UserModel } from '../models/user.model.js';

export class UserRepository {
  constructor(model = UserModel) {
    this.model = model;
  }

  getUserById(id) {
    return this.model.findOne({ _id: id });
  }

  update(id, payload) {
    return this.model.findByIdAndUpdate(id, { $set: payload }, { new: true });
  }
}
