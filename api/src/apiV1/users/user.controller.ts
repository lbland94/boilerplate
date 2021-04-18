import { authController } from '@/apiV1/auth/auth.route';
import { internalServerError, ServerError } from '@/helpers/errorHandler';
import { UserUpdateRequest } from '@/types/requests/user/UserUpdateRequest';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import isEmpty from 'lodash/isEmpty';
import User, { IUser } from './user.model';

export class UserController {
  public async findMe(req: Request, res: Response) {
    try {
      const user = (req as any).user as IUser;
      if (!user) {
        throw new ServerError({ message: 'User not found from token' });
      }

      res.status(httpStatus.OK).send(user);
    } catch (err) {
      internalServerError(err, req, res);
    }
  }

  public async update(req: Request<any, any, UserUpdateRequest>, res: Response) {
    const updateUser = req.body;
    try {
      const user = (req as any).user as IUser;
      if (!user) {
        throw new ServerError({ message: 'User not found from token' });
      }

      if (!isEmpty(updateUser)) {
        const userUpdated = await User.findByIdAndUpdate(
          user._id,
          {
            ...updateUser,
          },
          {
            new: true,
            runValidators: true,
            useFindAndModify: false,
          },
        ).exec();

        if (userUpdated.email && userUpdated.email !== user.email) {
          (req as any).user = userUpdated;
          return await authController.reauthenticate(req, res);
        }

        res.status(httpStatus.OK).send(userUpdated);
      } else {
        res.sendStatus(httpStatus.UNPROCESSABLE_ENTITY);
      }
    } catch (err) {
      internalServerError(err, req, res);
    }
  }

  public async remove(req: Request, res: Response) {
    try {
      const user = (req as any).user as IUser;
      if (!user) {
        throw new ServerError({ message: 'User not found from token' });
      }
      const delUser = await User.findByIdAndDelete(user._id).exec();

      if (!delUser) {
        return res.sendStatus(httpStatus.NOT_FOUND);
      }
      res.sendStatus(httpStatus.NO_CONTENT);
    } catch (err) {
      internalServerError(err, req, res);
    }
  }

  public async getUserById(req: Request, res: Response) {
    try {
      if (!req.params.id) {
        return res.sendStatus(httpStatus.UNPROCESSABLE_ENTITY);
      }
      const user = await User.findById(req.params.id).exec();

      if (!user) {
        throw new ServerError({ message: 'User not found by id' });
      }

      res.status(httpStatus.OK).send(user);
    } catch (err) {
      internalServerError(err, req, res);
    }
  }
}

const userController = new UserController();
export default userController;
