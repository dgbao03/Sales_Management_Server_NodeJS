import pool from '../config/db.js';
import OrderDetail from './OrderDetail.js';

class Order {
    static async getOrders() {
        try {
            const { rows } = await pool.query
            (`
                SELECT ddh.SoHoaDon, ddh.MaKhachHang, ddh.MaNhanVien, ddh.NgayDatHang, ddh.NgayGiaoHang, ddh.NgayChuyenHang, ddh.NoiGiaoHang,
                    json_agg(json_build_object(
                        'mahang', ctdh.MaHang,
                        'tenhang', mh.TenHang,
                        'giaban', ctdh.GiaBan,
                        'soluong', ctdh.SoLuong,
                        'mucgiamgia', ctdh.MucGiamGia
                    )) AS chitiet FROM DonDatHang AS ddh
                JOIN
                    ChiTietDatHang AS ctdh ON ddh.SoHoaDon = ctdh.SoHoaDon
                JOIN 
                    MatHang AS mh ON mh.MaHang = ctdh.MaHang
                GROUP BY
                    ddh.SoHoaDon, ddh.MaKhachHang, ddh.MaNhanVien, ddh.NgayDatHang, ddh.NgayGiaoHang, ddh.NgayChuyenHang, ddh.NoiGiaoHang;
            `);
    
            return rows;
        } catch (error) {
            return error;
        }
    }

    static async getOrderById(id) {
        try {
            const { rows } = await pool.query
            (`
                SELECT ddh.SoHoaDon, ddh.MaKhachHang, ddh.MaNhanVien, ddh.NgayDatHang, ddh.NgayGiaoHang, ddh.NgayChuyenHang, ddh.NoiGiaoHang,
                    json_agg(json_build_object(
                        'mahang', ctdh.MaHang,
                        'tenhang', mh.TenHang,
                        'giaban', ctdh.GiaBan,
                        'soluong', ctdh.SoLuong,
                        'mucgiamgia', ctdh.MucGiamGia
                    )) AS chitiet FROM DonDatHang AS ddh
                JOIN
                    ChiTietDatHang AS ctdh ON ddh.SoHoaDon = ctdh.SoHoaDon
                JOIN 
                    MatHang AS mh ON mh.MaHang = ctdh.MaHang
                WHERE ddh.SoHoaDon = $1 
                GROUP BY
                    ddh.SoHoaDon, ddh.MaKhachHang, ddh.MaNhanVien, ddh.NgayDatHang, ddh.NgayGiaoHang, ddh.NgayChuyenHang, ddh.NoiGiaoHang
                `, [id]
            );

            const totalBill = await OrderDetail.orderCalculation(id);
    
            return { order: rows[0], totalBill: totalBill };
        } catch (error) {
            return error;
        }
    }

    static async createOrder(order) {
        try {
            const { rows } = await pool.query('INSERT INTO DonDatHang (MaKhachHang, MaNhanVien, NgayDatHang, NgayGiaoHang, NgayChuyenHang, NoiGiaoHang) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [order.makhachhang, order.manhanvien, order.ngaydathang, order.ngaygiaohang, order.ngaychuyenhang, order.noigiaohang]);
            return rows[0];
        } catch (error) {
            return error;
        }
    }

    static async updateOrder(id, order) {
        try {
            const { rows } = await pool.query('UPDATE DonDatHang SET MaKhachHang = $1, MaNhanVien = $2, NgayDatHang = $3, NgayGiaoHang = $4, NgayChuyenHang = $5, NoiGiaoHang = $6 WHERE SoHoaDon = $7 RETURNING *', [order.makhachhang, order.manhanvien, order.ngaydathang, order.ngaygiaohang, order.ngaychuyenhang, order.noigiaohang, id]);
            return rows[0];
        } catch (error) {
            return error;
        }
    }

    static async deleteOrder(id) {
        try {
            await pool.query('DELETE FROM DonDatHang WHERE SoHoaDon = $1', [id]);
        } catch (error) {
            return error;
        }
    }
}

export default Order;