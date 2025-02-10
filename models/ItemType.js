import pool from '../config/db.js';

class ItemType {
    static async getItemTypes() {
        try {
            const { rows } = await pool.query('SELECT * FROM LoaiHang');
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async getItemTypeById(id) {
        try {
            const { rows: type } = await pool.query('SELECT * FROM LoaiHang WHERE MaLoaiHang = $1', [id]);
            
            if (!type) {
                return { type: null, items: [] };
            }

            const { rows: items } = await pool.query('SELECT mh.* FROM MatHang AS mh JOIN LoaiHang as lh on lh.MaLoaiHang = mh.MaLoaiHang WHERE lh.MaLoaiHang = $1', [id]);
            return { type: type[0], items };
        } catch (error) {
            throw error;
        }
    }

    static async createItemType(itemType) {
        try {
            const { rows } = await pool.query('INSERT INTO LoaiHang (TenLoaiHang) VALUES ($1) RETURNING *', [itemType.tenloaihang]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async updateItemType(id, itemType) {
        try {
            const { rows } = await pool.query('UPDATE LoaiHang SET TenLoaiHang = $1 WHERE MaLoaiHang = $2 RETURNING *', [itemType.tenloaihang, id]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async deleteItemType(id) {
        try {
            await pool.query('DELETE FROM LoaiHang WHERE MaLoaiHang = $1', [id]);
        } catch (error) {
            throw error;
        }
    }

    // Validation Functions
    static async checkTypeExisted(id, itemType) {
        try {
            let query = 'SELECT * FROM LoaiHang WHERE TenLoaiHang = $1';
            let values = [itemType.tenloaihang];
    
            if (id) {
                query += ' AND MaLoaiHang != $2';
                values.push(id);
            }
    
            const { rows } = await pool.query(query, values);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }
    
    
}

export default ItemType;