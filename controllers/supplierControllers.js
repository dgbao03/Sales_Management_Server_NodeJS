import SupplierService from '../services/SupplierServices.js';

// DONE
export const getSuppliers = async (req, res) => {
    try {
        const suppliers = await SupplierService.getSuppliers();
        res.status(200).json(suppliers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getSupplierById = async (req, res) => {
    try {
        const { supplier, products } = await SupplierService.getSupplierById(req.params.id);
        res.status(200).json( { supplier, products });
    } catch (error) {
        if (error.message === '404-NOTFOUND') {
            res.status(404).json({ message: 'Supplier not found! Please try again!' });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
}

// DONE
export const createSupplier = async (req, res) => {
    try {
        const supplier = await SupplierService.createSupplier(req.body);
        res.status(201).json({ message: 'Supplier created successfully!', supplier });
    } catch (error) {
        if (error.message === '400-NULL') {
            res.status(400).json({ message: 'Please fill in all the required fields!' });
        } else if (error.message === '409-ID') {
            res.status(409).json({ message: 'Supplier ID is already existed! Please try again!' });
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
export const updateSupplier = async (req, res) => {
    try {
        const supplier = await SupplierService.updateSupplier(req.params.id, req.body);
        res.status(200).json({ message: 'Supplier updated successfully!', supplier });
    } catch (error) {
        if (error.message === '400-NULL') {
            res.status(400).json({ message: 'Please fill in all the required fields!' });
        } else if (error.message === '404-NOTFOUND') {
            res.status(404).json({ message: 'Supplier not found! Please try again!' });
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
export const deleteSupplier = async (req, res) => {
    try {
        await SupplierService.deleteSupplier(req.params.id);
        res.sendStatus(204)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}