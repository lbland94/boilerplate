import { validateRequestBody, verifyToken } from '@/middleware/validator';
import { CreateRoleRequest } from '@/types/requests/role/CreateRoleRequest';
import { UpdateRoleRequest } from '@/types/requests/role/UpdateRoleRequest';
import { Router } from 'express';
import { roleController } from './role.controller';

/**
 * @swagger
 *
 * /v1/role:
 *   post:
 *     tags:
 *       - Role
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     requestBody:
 *       $ref: '#/components/requestBodies/RoleBody'
 *     responses:
 *       '200':
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *
 *   put:
 *     tags:
 *       - Role
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     requestBody:
 *       $ref: '#/components/requestBodies/RoleBody'
 *     responses:
 *       '200':
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *
 *   get:
 *     tags:
 *       - Role
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     responses:
 *       '200':
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Role'
 */

export const roleRouter: Router = Router();

// Create a role
roleRouter.post('', validateRequestBody(CreateRoleRequest), verifyToken, roleController.create);

// Update a role
roleRouter.put('', validateRequestBody(UpdateRoleRequest), verifyToken, roleController.update);

// Get a role
roleRouter.get('', roleController.get);
