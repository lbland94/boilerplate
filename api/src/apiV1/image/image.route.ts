import { setCacheControl } from '@/middleware/cacheControl';
import { verifyToken } from '@/middleware/validator';
import { Router } from 'express';
import { imageController } from './image.controller';

/**
 * @swagger
 *
 * /v1/image:
 *   post:
 *     tags:
 *       - Image
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '200':
 *         content:
 *           application/json:
 *             $ref: '#/components/schemas/Image'
 * /v1/image/{imageId}:
 *   get:
 *     tags:
 *       - Image
 *     produces:
 *       - application/octet-stream
 *     parameters:
 *       - in: path
 *         name: imageId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       '200':
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 *   put:
 *     tags:
 *       - Image
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: imageId
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '204':
 *   delete:
 *     tags:
 *       - Image
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: imageId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       '204':
 */

export const imageRouter: Router = Router();

// Get image by id
imageRouter.get('/:id', setCacheControl(60), imageController.getImageById);

// Create image
imageRouter.post('', verifyToken, imageController.createImage);

// Update image
imageRouter.put('/:id', verifyToken, imageController.updateImageById);

// Remove image by id
imageRouter.delete('/:id', verifyToken, imageController.deleteImageById);
