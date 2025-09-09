import { Router } from "express";
import {
  listarCategorias,
  crearCateoria,
  actualizarCategoria,
  eliminarCategoria,
} from "../Controllers/categorias.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Categorias
 *   description: Operaciones CRUD para categorías
 */

/**
 * @swagger
 * /api/categorias:
 *   get:
 *     summary: Lista todas las categorías
 *     tags: [Categorias]
 *     responses:
 *       200:
 *         description: Lista de categorías
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Categoria'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/", listarCategorias);

/**
 * @swagger
 * /api/categorias:
 *   post:
 *     summary: Crea una categoría
 *     tags: [Categorias]
 *     requestBody:
 *       $ref: '#/components/requestBodies/CategoriaCreate'
 *     responses:
 *       201:
 *         description: Categoría creada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id: { type: integer, example: 5 }
 *                 nombre: { type: string, example: "Frontend" }
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/", crearCateoria);

/**
 * @swagger
 * /api/categorias/{id}:
 *   put:
 *     summary: Actualiza una categoría por id
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Id de la categoría
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       $ref: '#/components/requestBodies/CategoriaUpdate'
 *     responses:
 *       200:
 *         description: Categoría actualizada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 updated: { type: boolean, example: true }
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put("/:id", actualizarCategoria);

/**
 * @swagger
 * /api/categorias/{id}:
 *   delete:
 *     summary: Elimina una categoría por id
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Id de la categoría
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Categoría eliminada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 deleted: { type: boolean, example: true }
 *       400:
 *         description: Id inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/:id", eliminarCategoria);

export default router;
