import User from '@/apiV1/users/user.model';
import config from '@/config/config';
import { validate, ValidatorOptions } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt from 'jwt-then';
import merge from 'lodash/merge';

const validatorOptions: ValidatorOptions = {
  skipMissingProperties: true,
  whitelist: true,
  validationError: {
    value: true,
    target: false,
  },
};

/**
 * Express middleware function that validates that the body of request object matches the provided class. We
 * utilize the plugin `class-validator` to perform the validation based on property annotations that are present
 * on the class.
 *
 * @param requestBodyClass
 */
export function validateRequestBody<T>(requestBodyClass: new (...args: any[]) => T) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const request = new requestBodyClass(req.body);
    const errors = await validate(request, validatorOptions);
    if (errors.length > 0) {
      res
        .status(httpStatus.BAD_REQUEST)
        .json({
          errors: merge(
            {},
            ...errors.map(function mapErrors(err) {
              return {
                [err.property]: {
                  ...err,
                  children:
                    (err.children &&
                      err.children.length > 0 &&
                      merge({}, ...err.children.map((childErr) => mapErrors(childErr)))) ||
                    undefined,
                  property: undefined,
                },
              };
            }),
          ),
        })
        .send();
    } else {
      req.body = request;
      next();
    }
  };
}

export async function verifyToken(req: Request, res: Response, next: NextFunction): Promise<any> {
  // check header or cookie for token
  const headerToken = (req.headers.authorization && req.headers.authorization.split(' ')[1]) || '';
  const cookieToken = (req.cookies && req.cookies.Auth) || '';

  const token = headerToken || cookieToken;

  if (!token) {
    return res.status(httpStatus.UNAUTHORIZED).send({ auth: false, message: 'No token provided.' });
  }

  try {
    // verifies secret and checks exp
    const decoded = (await jwt.verify(token, config.JWT_ENCRYPTION)) as { email: string; loginId: string } | string;
    if (typeof decoded !== 'string') {
      (req as any).email = decoded.email;

      const user = await User.findOne({
        email: (req as any).email,
      });

      if (!user) {
        return res.sendStatus(httpStatus.NOT_FOUND);
      }

      (req as any).user = user;

      if (decoded.loginId !== user.loginId) {
        throw { message: 'token invalid' };
      }
      next();
    } else {
      throw { message: decoded };
    }
  } catch (err) {
    res.status(httpStatus.UNAUTHORIZED).send({
      errors: [
        {
          message: err.message || '',
          data: err,
        },
      ],
    });
  }
}
