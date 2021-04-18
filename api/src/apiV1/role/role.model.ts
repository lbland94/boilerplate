import mongoose from 'mongoose';

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         permission:
 *           type: string
 *           enum: [ USER, ADMIN ]
 *         permissionStrength:
 *           type: number
 *       required:
 *         - name
 *         - permission
 *         - permissionStrength
 */

export enum IRolePermission {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export const IRolePermissionStrength = {
  [IRolePermission.USER]: 100,
  [IRolePermission.ADMIN]: 1000,
};

export interface IRole extends mongoose.Document {
  name: string;
  description?: string;
  permission: IRolePermission;
  permissionStrength: number;
}

export const RoleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
    permission: {
      type: String,
      enum: Object.values(IRolePermission),
      required: true,
      unique: true,
    },
    permissionStrength: {
      type: Number,
      enum: Object.values(IRolePermissionStrength),
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    useNestedStrict: true,
  },
);

RoleSchema.set('toJSON', {
  transform(doc, ret, options) {
    delete ret.__v;
    delete ret._id;
    delete ret.createdAt;
    delete ret.updatedAt;
  },
});

export default mongoose.model<IRole>('Role', RoleSchema);
