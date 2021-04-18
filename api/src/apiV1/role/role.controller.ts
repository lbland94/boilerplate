import { errorHandler } from '@/helpers/errorHandler';
import { CreateRoleRequest } from '@/types/requests/role/CreateRoleRequest';
import { UpdateRoleRequest } from '@/types/requests/role/UpdateRoleRequest';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import Role from './role.model';

export class RoleController {
  public async create(req: Request<any, any, CreateRoleRequest>, res: Response) {
    try {
      const createRoleRequest = req.body;

      const newRole = new Role(createRoleRequest);
      await newRole.save();

      res.status(httpStatus.OK).json(newRole);
    } catch (err) {
      errorHandler.internalServerError(err, req, res);
    }
  }
  public async update(req: Request<any, any, UpdateRoleRequest>, res: Response) {
    try {
      const updateRoleRequest = req.body;

      const updatedRole = await Role.findOneAndUpdate({ permission: updateRoleRequest.permission }, updateRoleRequest, {
        new: true,
        useFindAndModify: false,
      }).exec();

      if (!updatedRole) {
        return res.status(httpStatus.NOT_FOUND).json({
          message: `Role with permission ${updateRoleRequest.permission} not found`,
        });
      }

      res.status(httpStatus.OK).json(updatedRole);
    } catch (err) {
      errorHandler.internalServerError(err, req, res);
    }
  }
  public async get(req: Request, res: Response) {
    try {
      const roles = await Role.find().exec();

      res.status(httpStatus.OK).json(roles);
    } catch (err) {
      errorHandler.internalServerError(err, req, res);
    }
  }
}

export const roleController = new RoleController();
