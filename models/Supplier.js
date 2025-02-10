import pool from '../config/db.js';

class Supplier {
    static async getSuppliers() {
        try {
            const { rows } = await pool.query('SELECT * FROM NhaCungCap');
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async getSupplierById(id) {
        try {
            const { rows: supplier } = await pool.query('SELECT * FROM NhaCungCap WHERE MaCongTy = $1', [id]);
            if (!supplier) {
                return { supplier: null };
            }

            const { rows: products } = await pool.query('SELECT mh.* from NhaCungCap as ncc join MatHang as mh on mh.MaCongTy = ncc.MaCongTy WHERE ncc.macongty = $1', [id]);
            return { supplier: supplier[0], products };
        } catch (error) {
            throw error;
        }
    }

    static async createSupplier(supplier) {
        try {
            const { rows } = await pool.query('INSERT INTO NhaCungCap (MaCongTy, TenCongTy, TenGiaoDich, DiaChi, DienThoai, Fax, Email) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [supplier.macongty, supplier.tencongty, supplier.tengiaodich, supplier.diachi, supplier.dienthoai, supplier.fax, supplier.email]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async updateSupplier(id, supplier) {
        try {
            const { rows } = await pool.query('UPDATE NhaCungCap SET TenCongTy = $1, TenGiaoDich = $2, DiaChi = $3, DienThoai = $4, Fax = $5, Email = $6 WHERE MaCongTy = $7 RETURNING *', [supplier.tencongty, supplier.tengiaodich, supplier.diachi, supplier.dienthoai, supplier.fax, supplier.email, id]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async deleteSupplier(id) {
        try {
            await pool.query('DELETE FROM NhaCungCap WHERE MaCongTy = $1', [id]);
        } catch (error) {
            throw error;
        }
    }

    // Validation Functions
    static async checkIdExisted(supplier) {
        try {
            const { rows } = await pool.query('SELECT * FROM NhaCungCap WHERE MaCongTy = $1', [supplier.macongty]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async checkPhoneExisted(supplier) {
        try {
            const { rows } = await pool.query('SELECT * FROM NhaCungCap WHERE DienThoai = $1 AND MaCongTy != $2', [supplier.dienthoai, supplier.macongty]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async checkEmailExisted(supplier) {
        try {
            const { rows } = await pool.query('SELECT * FROM NhaCungCap WHERE Email = $1 AND MaCongTy != $2', [supplier.email, supplier.macongty]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }
}

export default Supplier;