import mongoose, { Schema } from 'mongoose';

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *         image:
 *           type: string
 */
export interface IUser extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  loginId?: string;
  password?: string;
  image?: string;
}

export interface IUserJson {
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  _id: string;
}

export const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: Schema.Types.ObjectId,
      ref: 'Image',
      required: false,
    },
    loginId: {
      type: String,
      default: mongoose.Types.ObjectId().toHexString(),
    },
  },
  {
    timestamps: true,
    useNestedStrict: true,
  },
);

UserSchema.set('toJSON', {
  transform(doc, ret, options) {
    delete ret.password;
    delete ret.__v;
    delete ret.createdAt;
    delete ret.updatedAt;
    delete ret.loginId;
  },
});

export default mongoose.model<IUser>('User', UserSchema);
