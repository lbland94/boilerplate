import { IUser } from '@/apiV1/users/user.model';
import { internalServerError, ServerError } from '@/helpers/errorHandler';
import { upload } from '@/middleware/multer';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import Image, { ImageType } from '@/apiV1/image/image.model';

export class UserImageController {
  /**
   * Creates an image and returns a body with the id
   */
  public async createImage(req: Request, res: Response) {
    try {
      await new Promise<void>((resolve, reject) => {
        upload.single('image')(req, res, (error: any) => {
          if (error) {
            console.log(`upload.single error: ${error}`);
            return reject(
              new ServerError({
                message: error.message,
                error,
              }),
            );
          }
          return resolve();
        });
      });

      const user: IUser = (req as any).user;
      if (!user) {
        throw new ServerError({ message: 'User not found from token' });
      }

      const image = new Image({
        data: req.file.buffer,
        type: req.file.mimetype as ImageType,
        user: user._id,
      });

      await image.save();

      res.status(httpStatus.OK).json(image.toJSON());
    } catch (err) {
      internalServerError(err, req, res);
    }
  }

  /**
   * Gets an image by an image id
   */
  public async getImageById(req: Request, res: Response) {
    try {
      if (!req.params.id) {
        return res.sendStatus(httpStatus.UNPROCESSABLE_ENTITY);
      }
      const image = await Image.findById(req.params.id).exec();
      if (!image) {
        return res.sendStatus(httpStatus.NOT_FOUND);
      }

      res.writeHead(httpStatus.OK, {
        'Content-Type': image.type,
        'Content-Length': image.data.length,
      });
      res.end(image.data);
    } catch (err) {
      internalServerError(err, req, res);
    }
  }

  /**
   * Updates an image by an image id
   */
  public async updateImageById(req: Request, res: Response) {
    try {
      if (!req.params.id) {
        return res.sendStatus(httpStatus.UNPROCESSABLE_ENTITY);
      }
      const image = await Image.findById(req.params.id).exec();
      if (!image) {
        return res.sendStatus(httpStatus.NOT_FOUND);
      }

      const user: IUser = (req as any).user;
      if (!user) {
        throw new ServerError({ message: 'User not found from token' });
      }

      if (image.user.toString() != user._id) {
        return res.sendStatus(httpStatus.UNAUTHORIZED);
      }

      await new Promise<void>((resolve, reject) => {
        upload.single('image')(req, res, (error: any) => {
          if (error) {
            console.log(`upload.single error: ${error}`);
            return reject(
              new ServerError({
                message: error.message,
                error,
              }),
            );
          }
          return resolve();
        });
      });

      image.set('data', req.file.buffer).set('type', req.file.mimetype as ImageType);

      await image.save();

      res.sendStatus(httpStatus.NO_CONTENT);
    } catch (err) {
      internalServerError(err, req, res);
    }
  }

  /**
   * Deletes an image by an image id
   */
  public async deleteImageById(req: Request, res: Response) {
    try {
      const user: IUser = (req as any).user;
      if (!user) {
        throw new ServerError({ message: 'User not found from token' });
      }

      if (!req.params.id) {
        return res.sendStatus(httpStatus.UNPROCESSABLE_ENTITY);
      }
      const image = await Image.findByIdAndDelete(req.params.id).exec();

      if (!image) {
        return res.sendStatus(httpStatus.NOT_FOUND);
      }

      res.sendStatus(httpStatus.NO_CONTENT);
    } catch (err) {
      internalServerError(err, req, res);
    }
  }
}

export const imageController = new UserImageController();
