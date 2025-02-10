import express from 'express';
const routes = express.Router();
import {
    getSuppliers,
    getSupplierById,
    createSupplier,
    updateSupplier,
    deleteSupplier
} from '../controllers/supplierControllers.js'

import { verifyRole } from '../middlewares/verifyRole.js';

routes.use(verifyRole('QuanLy'));

// Get all suppliers and Create a new supplier
routes.route('/')
    .get(getSuppliers)
    .post(createSupplier);

// Get a supplier by ID, Update a supplier by ID, Delete a supplier by ID
routes.route('/:id')
    .get(getSupplierById)
    .put(updateSupplier)
    .delete(deleteSupplier);

export default routes;