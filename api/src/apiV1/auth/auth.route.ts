import { validateRequestBody, verifyToken } from '@/middleware/validator';
import { LoginRequest } from '@/types/requests/auth/LoginRequest';
import { RegistrationRequest } from '@/types/requests/auth/RegistrationRequest';
import { Router } from 'express';
import Controller from './auth.controller';

/**
 * @swagger
 *
 * /v1/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     produces:
 *       - application/json
 *     requestBody:
 *       $ref: '#/components/requestBodies/LoginBody'
 *     responses:
 *       '200':
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *
 * /v1/auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     produces:
 *       - application/json
 *     requestBody:
 *       $ref: '#/components/requestBodies/RegistrationBody'
 *     responses:
 *       '200':
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegistrationResponse'
 *
 * /v1/auth/renewToken:
 *   get:
 *     tags:
 *       - Auth
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *
 *     responses:
 *       '200':
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RenewTokenResponse'
 *
 * /v1/auth/logout:
 *   get:
 *     tags:
 *       - Auth
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *
 *     responses:
 *       '204':
 *         description: OK
 */

export const authRouter: Router = Router();
export const authController = new Controller();

// Sign In
authRouter.post('/login', validateRequestBody(LoginRequest), authController.authenticate);

// Renew Token
authRouter.get('/renewToken', verifyToken, authController.reauthenticate);

// Register New User
authRouter.post('/register', validateRequestBody(RegistrationRequest), authController.register);

authRouter.get('/logout', verifyToken, authController.logout);
