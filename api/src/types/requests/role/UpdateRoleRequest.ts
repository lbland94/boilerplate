import { IRolePermission, IRolePermissionStrength } from '@/apiV1/role/role.model';
import { GenericRequest } from '@/types/requests/GenericRequest';
import { IsDefined, IsEnum, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

/**
 * @swagger
 *
 * components:
 *   requestBodies:
 *     RoleBody:
 *       description:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Role'
 */

interface IUpdateRoleRequest {
  name: string;
  description?: string;
  permission: IRolePermission;
  permissionStrength: number;
}

export class UpdateRoleRequest extends GenericRequest<UpdateRoleRequest> {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  public description?: string;

  @IsDefined()
  @IsEnum(IRolePermission)
  public permission: IRolePermission;

  @IsDefined()
  @IsNumber()
  @IsIn(Object.values(IRolePermissionStrength))
  public permissionStrength: number;

  public constructor(request: IUpdateRoleRequest) {
    super(request);

    this.permission = typeof request.permission === 'string' && (request.permission.toUpperCase() as IRolePermission);

    if (!request.permissionStrength && this.permission) {
      this.permissionStrength = IRolePermissionStrength[this.permission];
    }
  }
}
