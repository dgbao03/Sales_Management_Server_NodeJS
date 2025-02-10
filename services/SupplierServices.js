import Supplier from "../models/Supplier.js";

class SupplierService {
    static async getSuppliers() {
        try {
            const suppliers = await Supplier.getSuppliers();
            return suppliers;
        } catch (error) {
            throw error;
        }
    }

    static async getSupplierById(id) {
        try {
            const { supplier, products} = await Supplier.getSupplierById(id);
            if (!supplier) {
                throw new Error('404-NOTFOUND');
            }

            return { supplier, products };
        } catch (error) {
            throw error;
        }
    }

    static async createSupplier(supplier) {
        try {
            // Check if all the required fields are filled
            if (!supplier.macongty || !supplier.tencongty || !supplier.tengiaodich || !supplier.diachi || !supplier.email || !supplier.dienthoai) {
                throw new Error('400-NULL');
            }

            // Check if the supplier ID is already existed
            const existedId = await Supplier.checkIdExisted(supplier);
            if (existedId) {
                throw new Error('409-ID');
            }

            // Check if the phone number is already existed
            const existedPhone = await Supplier.checkPhoneExisted(supplier);
            if (existedPhone) {
                throw new Error('409-PHONE');
            }

            // Check if email is already existed
            const existedEmail = await Supplier.checkEmailExisted(supplier);
            if (existedEmail) {
                throw new Error('409-EMAIL');
            }

            const newSupplier = await Supplier.createSupplier(supplier);
            return newSupplier;
        } catch (error) {
            throw error;
        }
    }

    static async updateSupplier(id, supplier) {
        try {
            // Check if all the required fields are filled
            if (!supplier.macongty || !supplier.tencongty || !supplier.tengiaodich || !supplier.diachi || !supplier.email || !supplier.dienthoai) {
                throw new Error('400-NULL');
            }

            // Check if the phone number is already existed
            const existedPhone = await Supplier.checkPhoneExisted(supplier);
            if (existedPhone) {
                throw new Error('409-PHONE');
            }

            // Check if email is already existed
            const existedEmail = await Supplier.checkEmailExisted(supplier);
            if (existedEmail) {
                throw new Error('409-EMAIL');
            }

            const updatedSupplier = await Supplier.updateSupplier(id, supplier);
            if (!updatedSupplier) {
                throw new Error('404-NOTFOUND');
            }

            return updatedSupplier;
        } catch (error) {
            throw error;
        }
    }

    static async deleteSupplier(id) {
        try {
            await Supplier.deleteSupplier(id);
        } catch (error) {
            throw error;
        }
    }
}

export default SupplierService;