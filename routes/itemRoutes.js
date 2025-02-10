import express from 'express';
const routes = express.Router();
import {
    getItems, 
    getItemById, 
    createItem, 
    updateItem,
    deleteItem 
    } from '../controllers/itemControllers.js';

import { verifyRole } from '../middlewares/verifyRole.js';

// Get all items and Create a new item
routes.route('/')
    .get(getItems)
    .post(verifyRole("QuanLy"), createItem);

// Get a item by ID, Update a item by ID, Delete a item by ID
routes.route('/:id')
    .get(getItemById)
    .put(verifyRole("QuanLy"), updateItem)
    .delete(verifyRole("QuanLy"), deleteItem);

export default routes;