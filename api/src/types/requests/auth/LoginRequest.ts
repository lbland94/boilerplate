import { GenericRequest } from '@/types/requests/GenericRequest';
import { IsDefined, IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
/**
 * @swagger
 *
 * components:
 *   requestBodies:
 *     LoginBody:
 *       description:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 */
export class LoginRequest extends GenericRequest<LoginRequest> {
  @IsDefined()
  @IsString()
  @IsEmail()
  public email: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  public password: string;
}
