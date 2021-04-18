import { GenericRequest } from '@/types/requests/GenericRequest';
import { IsDefined, IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

/**
 * @swagger
 *
 * components:
 *   requestBodies:
 *     RegistrationBody:
 *       description:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               password:
 *                 type: string
 */
export class RegistrationRequest extends GenericRequest<RegistrationRequest> {
  @IsDefined()
  @IsString()
  @IsEmail()
  public email: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  public firstName: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  public lastName: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  public password: string;
}
