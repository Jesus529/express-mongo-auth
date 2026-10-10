
import mongoose from 'mongoose';
import { userService } from '../services/userService.js';

export const userController = {
  async getAll(req, res, next) {
    try {
      const users = await userService.getAll();
      res.json(users);
    } catch (error) {
      next(error);
    }
  },

  async getById(req, res, next) {
    try {
      if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({
          message: 'ID invalido'
        });
      }

      const user = await userService.getById(req.params.id);

      if (!user) {
        return res.status(404).json({
          message: 'Usuario no encontrado'
        });
      }

      res.json(user);
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      const user = await userService.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({
          message: 'ID invalido'
        });
      }

      const user = await userService.update(
        req.params.id,
        req.body
      );

      if (!user) {
        return res.status(404).json({
          message: 'Usuario no encontrado'
        });
      }

      res.json(user);
    } catch (error) {
      next(error);
    }
  },

  async remove(req, res, next) {
    try {
      if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({
          message: 'ID invalido'
        });
      }

      const user = await userService.remove(req.params.id);

      if (!user) {
        return res.status(404).json({
          message: 'Usuario no encontrado'
        });
      }

      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
};
