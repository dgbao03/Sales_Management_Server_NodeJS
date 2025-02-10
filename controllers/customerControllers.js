import CustomerService from '../services/CustomerServices.js';

// DONE
export const getCustomers = async (req, res) => {
    try {
        const customers = await CustomerService.getCustomers();
        res.status(200).json(customers);  
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// DONE
export const getCustomerById = async (req, res) => {
    try {
        const { customer, orders } = await CustomerService.getCustomerById(req.params.id);
        res.status(200).json({ customer, orders });
    } catch (error) {
        if (error.message === '404-NOTFOUND') {
            res.status(404).json({ message: 'Customer not found! Please try again!' });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
}

// DONE
export const createCustomer = async (req, res) => {
    try {
        const customer = await CustomerService.createCustomer(req.body);
        res.status(201).json({ message: 'Customer created successfully!', customer });
    } catch (error) {
        if (error.message === '400-NULL') {
            res.status(400).json({ message: 'Please fill in all the required fields!' });
        } else if (error.message === '409-ID') {
            res.status(409).json({ message: 'Customer ID is already existed! Please try again!' });
        } else if (error.message === '409-PHONE') {
            res.status(409).json({ message: 'Phone number is already existed! Please try again!' });
        } else if (error.message === '409-EMAIL') {
            res.status(409).json({ message: 'Email is already existed! Please try again!' });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
}

// DONE
export const updateCustomer = async (req, res) => {
    try {
        const customer = await CustomerService.updateCustomer(req.params.id, req.body);
        res.status(200).json({ message: 'Customer updated successfully!', customer });
    } catch (error) {
        if (error.message === '400-NULL') {
            res.status(400).json({ message: 'Please fill in all the required fields!' });
        } else if (error.message === '404-NOTFOUND') {
            res.status(404).json({ message: 'Customer not found! Please try again!' });
        } else if (error.message === '409-PHONE') {
            res.status(409).json({ message: 'Phone number is already existed! Please try again!' });
        } else if (error.message === '409-EMAIL') {
            res.status(409).json({ message: 'Email is already existed! Please try again!' });
        } else {
            res.status(500).json({ message: error.message});
        }
    }
}

// DONE
export const deleteCustomer = async (req, res) => {
    try {
        await CustomerService.deleteCustomer(req.params.id);
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


