import { GenericRequest } from '@/types/requests/GenericRequest';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
/**
 * @swagger
 *
 * components:
 *   requestBodies:
 *     UserUpdateBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               image:
 *                 type: string
 */
export class UserUpdateRequest extends GenericRequest<UserUpdateRequest> {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public firstName?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public lastName?: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  public email?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public image?: string;
}
