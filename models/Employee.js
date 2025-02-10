import pool from '../config/db.js';
import bcrypt from 'bcrypt';

class Employee {
    static async getEmployees() {
        try {
            const { rows } = await pool.query('SELECT * FROM NhanVien');
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async getEmployeeById(id) {
        try {
            const { rows: employee } = await pool.query('SELECT * FROM NhanVien WHERE MaNhanVien = $1', [id]);

            if (!employee) {
                return { employee: null, orders: [] };
            }

            const { rows: orders } = await pool.query('SELECT ctdh.* from ChiTietDatHang as ctdh join DonDatHang as ddh on ddh.SoHoaDon = ctdh.SoHoaDon  join NhanVien as nv on nv.MaNhanVien = ddh.MaNhanVien where nv.MaNhanVien = $1', [id]);
            return { employee: employee[0], orders };
        } catch (error) {
            throw error;
        }
    } 

    static async createEmployee(employee) {
        try {
            const hashedPassword = await bcrypt.hash(employee.matkhau, 10);

            const { rows } = await pool.query('INSERT INTO NhanVien (Ho, Ten, NgaySinh, NgayLamViec, DiaChi, DienThoai, LuongCoBan, PhuCap, VaiTro, MatKhau) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *', [employee.ho, employee.ten, employee.ngaysinh, employee.ngaylamviec, employee.diachi, employee.dienthoai, employee.luongcoban, employee.phucap, employee.vaitro, hashedPassword]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async updateEmployee(id, employee) {
        try {
            const { rows } = await pool.query('UPDATE NhanVien SET Ho = $1, Ten = $2, NgaySinh = $3, NgayLamViec = $4, DiaChi = $5, DienThoai = $6, LuongCoBan = $7, PhuCap = $8, VaiTro = $9, MatKhau = $10 WHERE MaNhanVien = $11 RETURNING *', [employee.ho, employee.ten, employee.ngaysinh, employee.ngaylamviec, employee.diachi, employee.dienthoai, employee.luongcoban, employee.phucap, employee.vaitro, employee.matkhau, id]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async deleteEmployee(id) {
        try {
            await pool.query('DELETE FROM NhanVien WHERE MaNhanVien = $1', [id]);
        } catch (error) {
            throw error;
        }
    }

    static async login(phone, password) {
        try {
            const { rows } = await pool.query('SELECT * FROM NhanVien WHERE DienThoai = $1', [phone]);

            if (!rows[0]) {
                return { employee: null, error: 'ERR-NOTFOUND' };
            }

            const isMatch = await bcrypt.compare(password, rows[0].matkhau);

            if (!isMatch) {
                return { employee: null, error: 'ERR-PASS' };
            }

            return { employee: rows[0], error: null };
        } catch (error) {
            throw error;
        }
    }

    // Validation Functions
    static async checkPhoneExisted(employee) {
        try {
            const { rows } = await pool.query('SELECT * FROM NhanVien WHERE DienThoai = $1 AND MaNhanVien != $2', [employee.dienthoai, employee.manhanvien]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }



}

export default Employee;