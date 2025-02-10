import pool from '../config/db.js';

class Item {
    static async getItems() {
        try {
            const { rows } = await pool.query('SELECT * FROM MatHang');
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async getItemById(id) {
        try {
            const { rows } = await pool.query('SELECT * FROM MatHang WHERE MaHang = $1', [id]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async createItem(item) {
        try {
            const { rows } = await pool.query('INSERT INTO MatHang (TenHang, MaCongTy, MaLoaiHang, SoLuong, DonViTinh, GiaHang) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [item.tenhang, item.macongty, item.maloaihang, item.soluong, item.donvitinh, item.giahang]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async updateItem(id, item) {
        try {
            const { rows } = await pool.query('UPDATE MatHang SET TenHang = $1, MaCongTy = $2, MaLoaiHang = $3, SoLuong = $4, DonViTinh = $5, GiaHang = $6 WHERE MaHang = $7 RETURNING *', [item.tenhang, item.macongty, item.maloaihang, item.soluong, item.donvitinh, item.giahang, id]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async deleteItem(id) {
        try {
            await pool.query('DELETE FROM MatHang WHERE MaHang = $1', [id]);
        } catch (error) {
            throw error;
        }
    }
    
}

export default Item;