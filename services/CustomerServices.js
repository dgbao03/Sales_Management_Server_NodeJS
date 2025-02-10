import Customer from '../models/Customer.js';

class CustomerService {
    static async getCustomers() {
        try {
            const customers = await Customer.getCustomers();
            return customers;
        } catch (error) {
            throw error;
        }
    }

    static async getCustomerById(id) {
        try {
            const { customer, orders } = await Customer.getCustomerById(id);
            if (!customer){
                throw new Error('404-NOTFOUND');
            }
            return { customer, orders };
        } catch (error) {
            throw error;
        }
    }

    static async createCustomer(customer) {
        try {
            // Check if all the required fields are filled
            if (!customer.makhachhang || !customer.tencongty || !customer.tengiaodich || !customer.diachi || !customer.email || !customer.dienthoai || !customer.fax) {
                throw new Error('400-NULL');
            }

            // Check if the customer ID is already existed
            const existedId = await Customer.checkIdExisted(customer);
            if (existedId) {
                throw new Error('409-ID');
            }

            // Check if the phone number is already existed
            const existedPhone = await Customer.checkPhoneExisted(customer);
            if (existedPhone) {
                throw new Error('409-PHONE');
            }

            // Check if email is already existed
            const existedEmail = await Customer.checkEmailExisted(customer);
            if (existedEmail) {
                throw new Error('409-EMAIL');
            }

            const newCustomer = await Customer.createCustomer(customer);
            return newCustomer;
        } catch (error) {
            throw error;
        }
    }

    static async updateCustomer(id, customer) {
        try {
            // Check if all the required fields are filled
            if (!customer.makhachhang || !customer.tencongty || !customer.tengiaodich || !customer.diachi || !customer.email || !customer.dienthoai || !customer.fax) {
                throw new Error('400-NULL');
            }

            // Check if the phone number is already existed
            const existedPhone = await Customer.checkPhoneExisted(customer);
            if (existedPhone) {
                throw new Error('409-PHONE');
            }

            // Check if email is already existed
            const existedEmail = await Customer.checkEmailExisted(customer);
            if (existedEmail) {
                throw new Error('409-EMAIL');
            }

            const updatedCustomer = await Customer.updateCustomer(id, customer);
            if (!updatedCustomer) {
                throw new Error('404-NOTFOUND');
            }
            
            return updatedCustomer;
        } catch (error) {
            throw error;
        }
    }

    static async deleteCustomer(id) {
        try {
            await Customer.deleteCustomer(id);
        } catch (error) {
            throw error;
        }
    }
}

export default CustomerService;