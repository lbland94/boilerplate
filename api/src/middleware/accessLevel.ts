import { IRole, IRolePermission, IRolePermissionStrength } from '@/apiV1/role/role.model';
import { IUser } from '@/apiV1/users/user.model';
import mongoose from 'mongoose';

export async function validateAccessLevel(
  user: IUser,
  { userRoles, userCreated }: IAccessLevelObject,
  lowestAllowedPermission: IRolePermission,
): Promise<boolean> {
  // User created
  // eslint-disable-next-line  eqeqeq
  if (userCreated && user.id == userCreated._id) {
    return true;
  }

  // User roles
  if (userRoles && userRoles.length > 0) {
    for (const userRole of userRoles) {
      if (userRole.user._id !== user._id) {
        continue;
      }
      if (userRole.role.permissionStrength >= IRolePermissionStrength[lowestAllowedPermission]) {
        return true;
      }
    }
  }
  return false;
}

export interface IAccessLevelObject extends mongoose.Document {
  userRoles?: IAccessLevelUserRole[];
  userCreated?: IUser;
}

interface IAccessLevelUserRole {
  user: IUser;
  role: IRole;
}
