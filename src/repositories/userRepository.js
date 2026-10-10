
import User from '../models/User.js';

export const userRepository = {
  getAll() {
    return User.find();
  },

  getById(id) {
    return User.findById(id);
  },

  create(data) {
    return User.create(data);
  },

  update(id, data) {
    return User.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    });
  },

  remove(id) {
    return User.findByIdAndDelete(id);
  }
};
