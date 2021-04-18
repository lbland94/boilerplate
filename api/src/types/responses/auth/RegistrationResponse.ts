import { IUserJson } from '@/apiV1/users/user.model';
/**
 * @swagger
 *
 * components:
 *   schemas:
 *     RegistrationResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *         user:
 *           $ref: '#/components/schemas/User'
 */
export interface IRegistrationResponse {
  user: IUserJson;
  token: string;
}
