import express from 'express';
const routes = express.Router();
import {
    getItemTypes, 
    getItemTypeById, 
    createItemType, 
    updateItemType,
    deleteItemType 
    } from '../controllers/itemTypeControllers.js';

import { verifyRole } from '../middlewares/verifyRole.js';

// Get all item types and Create a new item type
routes.route('/')
    .get(getItemTypes)
    .post(verifyRole("QuanLy"), createItemType);

// Get an item type by ID, Update an item type by ID, Delete an item type by ID
routes.route('/:id')
    .get(getItemTypeById)
    .put(verifyRole("QuanLy"), updateItemType)
    .delete(verifyRole("QuanLy"), deleteItemType);

export default routes;