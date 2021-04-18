import { IUserJson } from '@/apiV1/users/user.model';
/**
 * @swagger
 *
 * components:
 *   schemas:
 *     LoginResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *         user:
 *           $ref: '#/components/schemas/User'
 */

export interface ILoginResponse {
  user: IUserJson;
  token: string;
}
