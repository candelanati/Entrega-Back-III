import { Router } from 'express';
import { AdoptionController } from '../controllers/adoption.controller.js';
import { adoptionService } from '../services/adoption.service.js';

export const createAdoptionRouter = (service = adoptionService) => {
  const router = Router();
  const controller = new AdoptionController(service);

  /**
   * @openapi
   * /api/adoptions:
   *   get:
   *     summary: Obtener todas las adopciones
   *     tags:
   *       - Adopciones
   *     responses:
   *       200:
   *         description: Lista de adopciones obtenida correctamente
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   example: success
   *                 payload:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Adopcion'
   */
  router.get('/', controller.getAllAdoptions);

  /**
   * @openapi
   * /api/adoptions/{aid}:
   *   get:
   *     summary: Obtener una adopcion por ID
   *     tags:
   *       - Adopciones
   *     parameters:
   *       - in: path
   *         name: aid
   *         required: true
   *         schema:
   *           type: string
   *         description: ObjectId de MongoDB de la adopcion
   *     responses:
   *       200:
   *         description: Adopcion obtenida correctamente
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   example: success
   *                 payload:
   *                   $ref: '#/components/schemas/Adopcion'
   *       400:
   *         description: ID de adopcion invalido
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   *       404:
   *         description: Adopcion no encontrada
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  router.get('/:aid', controller.getAdoption);

  /**
   * @openapi
   * /api/adoptions/{uid}/{pid}:
   *   post:
   *     summary: Crear una adopcion
   *     tags:
   *       - Adopciones
   *     parameters:
   *       - in: path
   *         name: uid
   *         required: true
   *         schema:
   *           type: string
   *         description: ObjectId de MongoDB del usuario
   *       - in: path
   *         name: pid
   *         required: true
   *         schema:
   *           type: string
   *         description: ObjectId de MongoDB de la mascota
   *     responses:
   *       201:
   *         description: Adopcion creada correctamente
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   example: success
   *                 message:
   *                   type: string
   *                   example: Mascota adoptada
   *                 payload:
   *                   $ref: '#/components/schemas/Adopcion'
   *       400:
   *         description: ID invalido o mascota ya adoptada
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   *       404:
   *         description: Usuario o mascota no encontrado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  router.post('/:uid/:pid', controller.createAdoption);

  return router;
};

export default createAdoptionRouter;
