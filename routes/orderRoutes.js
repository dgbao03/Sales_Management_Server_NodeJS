import express from 'express';
const routes = express.Router();

import {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder 
} from '../controllers/orderControllers.js';
import { verifyRole } from '../middlewares/verifyRole.js';

routes.route('/')
    .get(getOrders)
    .post(createOrder);

routes.route('/:id')
    .get(getOrderById)
    .put(verifyRole("QuanLy"), updateOrder)
    .delete(verifyRole("QuanLy"), deleteOrder);
    
export default routes;