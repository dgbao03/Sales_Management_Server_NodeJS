import pool from '../config/db.js';

class OrderDetail {
    static async createOrderDetail(newOrder, orderDetails) {
        try {
            const values = orderDetails.map(({ mahang, giaban, soluong, mucgiamgia }) => 
                `(${newOrder.sohoadon}, ${mahang}, ${giaban}, ${soluong}, ${mucgiamgia})`
            ).join(", ");
            
            const query = `INSERT INTO ChiTietDatHang (SoHoaDon, MaHang, GiaBan, SoLuong, MucGiamGia) VALUES ${values} RETURNING *;`;
            const { rows } = await pool.query(query);
            return rows;
        } catch (error) {
            return error;
        }
    }

    static async updateOrderDetail(id, orderDetail) {
        try {
          const results = [];

          for (const item of orderDetail) {
            const { mahang, soluong, mucgiamgia } = item;
            const query = `UPDATE ChiTietDatHangSET SoLuong = $1, MucGiamGia = $2WHERE SoHoaDon = $3 AND MaHang = $4RETURNING *;
            `;
            const { rows } = await pool.query(query, [soluong, mucgiamgia, id, mahang]);
            results.push(...rows); 
          }

          return results;
        } catch (error) {
          console.error("Error updating order details:", error);
          return error;
        }
      }

      static async orderCalculation(id) {
        try {
            const { rows } = await pool.query('SELECT SoHoaDon, SUM(SoLuong * GiaBan - (SoLuong * GiaBan * MucGiamGia / 100)) AS TongGiaTri FROM ChiTietDatHang WHERE SoHoaDon = $1 GROUP BY SoHoaDon;', [id]);
            return rows[0];
        } catch (error) {
            return error;
        }
      }
    

}

export default OrderDetail;