import pool from '../config/db.js';

class RefreshToken {
    static async saveRefreshToken(userId, refreshToken) {
        try {
            const { rows } = await pool.query('INSERT INTO RefreshToken (UserId, RefreshToken) VALUES ($1, $2)', [userId, refreshToken]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async findRefreshToken(refreshToken) {
        try {
            const { rows } = await pool.query('SELECT * FROM RefreshToken WHERE RefreshToken = $1', [refreshToken]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async deleteRefreshToken(refreshToken) {
        try {
            const { rows } = await pool.query('DELETE FROM RefreshToken WHERE RefreshToken = $1 RETURNING *', [refreshToken]);
    
            if (rows.length === 0) {
                return null;
            }

            return rows[0];
        } catch (error) {
            throw error;
        }
    }
    
}

export default RefreshToken;