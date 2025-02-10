import Employee from '../models/Employee.js';

class EmployeeService {
    static async getEmployees() {
        try {
            const employees = await Employee.getEmployees();
            return employees;
        } catch (error) {
            throw error;
        }
    }

    static async getEmployeeById(id) {
        try {
            const { employee, orders } = await Employee.getEmployeeById(id);
            if (!employee){
                throw new Error('404-NOTFOUND');
            }
            return { employee, orders };
        } catch (error) {
            throw error;
        }
    }

    static async createEmployee(employee) {
        try {
            // Check if all the required fields are filled
            if (!employee.ho || !employee.ten || !employee.ngaysinh || !employee.ngaylamviec || !employee.diachi || !employee.dienthoai || !employee.luongcoban || !employee.phucap || !employee.vaitro || !employee.matkhau) {
                throw new Error('400-NULL');
            }

            if (employee.vaitro !== 'QuanLy' && employee.vaitro !== 'NhanVien') {
                throw new Error('400-ROLE');
            }

            // Check if the phone number is already existed
            const existedPhone = await Employee.checkPhoneExisted(employee);
            if (existedPhone) {
                throw new Error('409-PHONE');
            }

            const newEmployee = await Employee.createEmployee(employee);
            return newEmployee;
        } catch (error) {
            throw error;
        }
    }

    static async updateEmployee(id, employee) {
        try {
            // Check if all the required fields are filled
            if (!employee.ho || !employee.ten || !employee.ngaysinh || !employee.ngaylamviec || !employee.diachi || !employee.dienthoai || !employee.luongcoban || !employee.phucap || !employee.vaitro || !employee.matkhau) {
                throw new Error('400-NULL');
            }

            if (employee.vaitro !== 'QuanLy' && employee.vaitro !== 'NhanVien') {
                throw new Error('400-ROLE');
            }

            // Check if the phone number is already existed
            const existedPhone = await Employee.checkPhoneExisted(employee);
            if (existedPhone) {
                throw new Error('409-PHONE');
            }

            const updatedEmployee = await Employee.updateEmployee(id, employee);
            if (!updatedEmployee) {
                throw new Error('404-NOTFOUND');
            }

            return updatedEmployee;
        } catch (error) {
            throw error;
        }
    }

    static async deleteEmployee(id) {
        try {
            await Employee.deleteEmployee(id);
        } catch (error) {
            throw error;
        }
    }

}

export default EmployeeService; 