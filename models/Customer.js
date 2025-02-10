import pool from '../config/db.js';

class Customer {
    static async getCustomers() {
        try {
            const { rows } = await pool.query('SELECT * FROM KhachHang');
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async getCustomerById(id) {
        try {
            const { rows: customer } = await pool.query('SELECT * FROM KhachHang WHERE MaKhachHang = $1', [id]);

            if (!customer) {
                return { customer: null, orders: [] };
            }

            const { rows: orders } = await pool.query('SELECT ctdh.* from ChiTietDatHang as ctdh join DonDatHang as ddh on ddh.SoHoaDon = ctdh.SoHoaDon  join KhachHang as kh on kh.MaKhachHang = ddh.MaKhachHang where kh.MaKhachHang = $1', [id]);
            return { customer: customer[0], orders };
        } catch (error) {
            throw error;
        }
    }

    static async createCustomer(customer) {
        try {
            const { rows } = await pool.query('INSERT INTO KhachHang (MaKhachHang, TenCongTy, TenGiaoDich, DiaChi, Email, DienThoai, Fax) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [customer.makhachhang, customer.tencongty, customer.tengiaodich, customer.diachi, customer.email, customer.dienthoai, customer.fax]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async updateCustomer(id, customer) {
        try {
            const { rows } = await pool.query('UPDATE KhachHang SET TenCongTy = $1, TenGiaoDich = $2, DiaChi = $3, Email = $4, DienThoai = $5, Fax = $6 WHERE MaKhachHang = $7 RETURNING *', [customer.tencongty, customer.tengiaodich, customer.diachi, customer.email, customer.dienthoai, customer.fax, id]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async deleteCustomer(id) {
        try {
            await pool.query('DELETE FROM KhachHang WHERE MaKhachHang = $1', [id]);
        } catch (error) {
            throw error;
        }
    }

    // Validation Functions
    static async checkIdExisted(customer) {
        try {
            const { rows } = await pool.query('SELECT * FROM KhachHang WHERE MaKhachHang = $1', [customer.makhachhang]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async checkPhoneExisted(customer) {
        try {
            const { rows } = await pool.query('SELECT * FROM KhachHang WHERE DienThoai = $1 AND MaKhachHang != $2', [customer.dienthoai, customer.makhachhang]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async checkEmailExisted(customer) {
        try {
            const { rows } = await pool.query('SELECT * FROM KhachHang WHERE Email = $1 AND MaKhachHang != $2', [customer.email, customer.makhachhang]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }
}

export default Customer;

