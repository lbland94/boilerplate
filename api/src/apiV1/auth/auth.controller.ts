import User, { IUser } from '@/apiV1/users/user.model';
import config from '@/config/config';
import { errorHandler, internalServerError } from '@/helpers/errorHandler';
import { LoginRequest } from '@/types/requests/auth/LoginRequest';
import { RegistrationRequest } from '@/types/requests/auth/RegistrationRequest';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt from 'jwt-then';
import mongoose from 'mongoose';

export default class AuthController {
  public async authenticate(req: Request<any, any, LoginRequest>, res: Response): Promise<any> {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email: req.body.email }).exec();
      if (!user) {
        return res.sendStatus(httpStatus.NOT_FOUND);
      }

      const matchPasswords = await bcrypt.compare(password, (user as any).password);
      if (!matchPasswords) {
        return res.sendStatus(httpStatus.UNAUTHORIZED);
      }

      user.loginId = mongoose.Types.ObjectId().toHexString();
      const newUser = await user.save();

      const token = await jwt.sign({ email, loginId: newUser.loginId }, config.JWT_ENCRYPTION, {
        expiresIn: config.JWT_EXPIRATION,
      });

      res.status(httpStatus.OK).send({
        user,
        token,
      });
    } catch (err) {
      errorHandler.internalServerError(err, req, res);
    }
  }

  public async register(req: Request<any, any, RegistrationRequest>, res: Response): Promise<any> {
    const { firstName, lastName, email, password } = req.body;
    try {
      const hash = await bcrypt.hash(password, config.SALT_ROUNDS);

      const user = new User({
        firstName,
        lastName,
        email,
        password: hash,
      });

      const newUser = await user.save();

      const token = await jwt.sign({ email, loginId: newUser.loginId }, config.JWT_ENCRYPTION, {
        expiresIn: config.JWT_EXPIRATION,
      });

      res.status(httpStatus.CREATED).send({
        user: newUser,
        token,
      });
    } catch (err) {
      internalServerError(err, req, res);
    }
  }

  public async reauthenticate(req: Request, res: Response): Promise<any> {
    try {
      const user: IUser = (req as any).user;

      user.loginId = mongoose.Types.ObjectId().toHexString();
      const newUser = await user.save();

      const token = await jwt.sign({ email: user.email, loginId: newUser.loginId }, config.JWT_ENCRYPTION, {
        expiresIn: config.JWT_EXPIRATION,
      });

      res.status(httpStatus.OK).send({
        user,
        token,
      });
    } catch (err) {
      internalServerError(err, req, res);
    }
  }

  public async logout(req: Request, res: Response): Promise<any> {
    try {
      const user: IUser = (req as any).user;

      user.loginId = mongoose.Types.ObjectId().toHexString();
      await user.save();

      res.sendStatus(204);
    } catch (err) {
      internalServerError(err, req, res);
    }
  }
}
