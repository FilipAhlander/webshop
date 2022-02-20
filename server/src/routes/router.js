import express from "express";

import * as categoryController from '../controllers/categoryController.js';
import * as productController from '../controllers/productController.js';

const router = express.Router();

router.get('/categories/', categoryController.getCategories);
router.get('/categories/:id', categoryController.getCategory);
router.post('/categories/', categoryController.createCategory);
router.patch('/categories/:id', categoryController.editCategory);
router.delete('/categories/:id', categoryController.removeCategory);

router.get('/products/');
router.get('/products/:id', productController.getProduct);
router.post('/products/', productController.createProduct);
router.patch('/products/:id', productController.editProduct);
router.delete('/products/:id', productController.removeProduct);


export default router;