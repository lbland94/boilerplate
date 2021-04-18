import { validateRequestBody, verifyToken } from '@/middleware/validator';
import { UserUpdateRequest } from '@/types/requests/user/UserUpdateRequest';
import { Router } from 'express';
import controller from './user.controller';

export const userRouter: Router = Router();

/**
 * @swagger
 *
 * /v1/user:
 *   get:
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *   put:
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     requestBody:
 *       $ref: '#/components/requestBodies/UserUpdateBody'
 *     responses:
 *       '200':
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *   delete:
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '204':
 * /v1/user/{userId}:
 *   get:
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       '200':
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */

// Retrieve your user information
userRouter.get('', verifyToken, controller.findMe);

// Update your user
userRouter.put('', validateRequestBody(UserUpdateRequest), verifyToken, controller.update);

// Delete your own user
userRouter.delete('', verifyToken, controller.remove);

// Get some user information by user id
userRouter.get('/:id', controller.getUserById);
