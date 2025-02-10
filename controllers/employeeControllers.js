import express from 'express';
import EmployeeService from '../services/EmployeeServices.js';
const routes = express.Router();

// DONE
export const getEmployees = async (req, res) => {
    try {
        const employees = await EmployeeService.getEmployees();
        res.status(200).json(employees);  
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DONE
export const getEmployeeById = async (req, res) => {
    try {
        const { employee, orders } = await EmployeeService.getEmployeeById(req.params.id);
        res.status(200).json({ employee, orders });
    } catch (error) {
        if (error.message === '404-NOTFOUND') {
            res.status(404).json({ message: 'Employee not found! Please try again!' });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
}

// DONE
export const createEmployee = async (req, res) => {
    try {
        const employee = await EmployeeService.createEmployee(req.body);
        res.status(201).json({ message: 'Employee created successfully!', employee });
    } catch (error) {
        if (error.message === '400-NULL') {
            res.status(400).json({ message: 'Please fill in all the required fields!' });
        } else if (error.message === '409-PHONE') {
            res.status(409).json({ message: 'Phone number is already existed! Please try again!' });
        } else if (error.message === '400-ROLE') {
            res.status(400).json({ message: 'Role is invalid! Please try again!' });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
}

// DONE
export const updateEmployee = async (req, res) => {
    try {
        const employee = await EmployeeService.updateEmployee(req.params.id, req.body);
        res.status(200).json({ message: 'Employee updated successfully!', employee });
    } catch (error) {
        if (error.message === '400-NULL') {
            res.status(400).json({ message: 'Please fill in all the required fields!' });
        } else if (error.message === '404-NOTFOUND') {
            res.status(404).json({ message: 'Employee not found! Please try again!' });
        } else if (error.message === '409-PHONE') {
            res.status(409).json({ message: 'Phone number is already existed! Please try again!' });
        } else if (error.message === '400-ROLE') {
            res.status(400).json({ message: 'Role is invalid! Please try again!' });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
}

export const deleteEmployee = async (req, res) => {
    try {
        const employee = await EmployeeService.deleteEmployee(req.params.id);
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export default routes;