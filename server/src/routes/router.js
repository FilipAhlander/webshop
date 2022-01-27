import express from "express";

import * as categoryController from '../controllers/categoryController.js';

const router = express.Router();

router.post('/categories/', categoryController.createCategory);
router.get('/categories/', categoryController.getCategories);
router.get('/categories/:id', categoryController.getCategory);
router.patch('/categories/:id', categoryController.editCategory);
router.delete('/categories/:id', categoryController.removeCategory);

export default router;