import { IUserJson } from '@/apiV1/users/user.model';
/**
 * @swagger
 *
 * components:
 *   schemas:
 *     RenewTokenResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *         user:
 *           $ref: '#/components/schemas/User'
 */
export interface IRenewTokenResponse {
  user: IUserJson;
  token: string;
}
