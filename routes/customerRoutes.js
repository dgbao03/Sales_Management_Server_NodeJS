import express from 'express';
const routes = express.Router();
import {
    getCustomers, 
    getCustomerById, 
    createCustomer, 
    updateCustomer,
    deleteCustomer 
    } from '../controllers/customerControllers.js';
import { verifyRole } from '../middlewares/verifyRole.js';

// Get all customers and Create a new customer
routes.route('/')
    .get(getCustomers)
    .post(createCustomer);

// Get a customer by ID, Update a customer by ID, Delete a customer by ID
routes.route('/:id')
    .get(getCustomerById)
    .put(verifyRole("QuanLy"), updateCustomer)
    .delete(verifyRole("QuanLy"), deleteCustomer);

export default routes;
