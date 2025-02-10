import express from 'express';
const routes = express.Router();
import {
    getEmployees, 
    getEmployeeById, 
    createEmployee, 
    updateEmployee,
    deleteEmployee 
    } from '../controllers/employeeControllers.js';
    
import { verifyRole } from '../middlewares/verifyRole.js';

routes.use(verifyRole('QuanLy'));

// Get all employees and Create a new employee
routes.route('/')
    .get(getEmployees)
    .post(createEmployee);

// Get a employee by ID, Update a employee by ID, Delete a employee by ID
routes.route('/:id')
    .get(getEmployeeById)
    .put(updateEmployee)
    .delete(deleteEmployee);

export default routes;