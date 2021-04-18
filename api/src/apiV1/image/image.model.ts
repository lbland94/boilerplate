import mongoose, { Schema } from 'mongoose';
import { IUser } from '@/apiV1/users/user.model';

export enum ImageType {
  PNG = 'image/png',
  JPG = 'image/jpg',
  JPEG = 'image/jpeg',
}

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     Image:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 */
export interface IImage extends mongoose.Document {
  data: Buffer;
  type: ImageType;
  user: IUser;
}

export const ImageSchema = new mongoose.Schema({
  data: {
    type: Buffer,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: Object.values(ImageType),
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

ImageSchema.set('toJSON', {
  transform(doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.data;
    delete ret.user;
    delete ret.type;
  },
});

export default mongoose.model<IImage>('Image', ImageSchema);
