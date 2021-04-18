import { IRole } from '@/apiV1/role/role.model';
import { IUser } from '@/apiV1/users/user.model';
import mongoose from 'mongoose';

export interface IUserRole extends mongoose.Document {
  user: IUser | mongoose.Types.ObjectId;
  role: IRole | mongoose.Types.ObjectId;
}

export const UserRoleSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
    },
  },
  {
    timestamps: true,
    useNestedStrict: true,
  },
);

UserRoleSchema.set('toJSON', {
  transform(doc, ret, options) {
    delete ret.__v;
    delete ret.createdAt;
    delete ret.updatedAt;
  },
});

export default mongoose.model<IUserRole>('UserRole', UserRoleSchema);
