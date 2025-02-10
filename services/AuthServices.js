import jwt from 'jsonwebtoken';
import Employee from '../models/Employee.js';
import dotenv from 'dotenv';
import fs from 'fs';
import RefreshToken from '../models/RefreshToken.js';

dotenv.config({ path: '../.env' });

class AuthServices {
    static async login(phone, password) {
        try {
            const { employee, error } = await Employee.login(phone, password);

            if (employee === null) {
                if (error === 'ERR-NOTFOUND'){
                    throw new Error('404-NOTFOUND');
                } else if (error === 'ERR-PASS') {
                    throw new Error('400-PASS');
                } else {
                    throw new Error('500-INTERNAL');
                }
            }

            // Generate Access Token for Client
            const data = {employee: employee.manhanvien, role: employee.vaitro};
            const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });

            // Generate Refresh Token for Client
            const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '60s' });

            // Save Refresh Token to Database
            const refreshTokenDB = RefreshToken.saveRefreshToken(employee.manhanvien, refreshToken);
            if (refreshTokenDB === null) {
                throw new Error('500-INTERNAL');
            }

            return { accessToken, refreshToken };

        } catch (error) {
            throw error;
        }
    }

    static async verifyRefreshToken(refreshToken) {
        try {
            const foundRefreshToken = RefreshToken.findRefreshToken(refreshToken);
            if (!foundRefreshToken) {
                throw new Error('403');
            }

            let newAccessToken = '';

            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err || foundRefreshToken.userId != user.userId) {
                    throw new Error('403');
                }

                const data = {employee: user.employee, role: user.role};
                newAccessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
            });

            return newAccessToken;
        } catch (error) {
            throw error;
        }
    }

    static async logout(refreshToken) {
        try {
            const deletedRefreshToken = RefreshToken.deleteRefreshToken(refreshToken);
            if (!deletedRefreshToken) {
                throw new Error();
            }
            return true;
        } catch (error) {
            throw error;
        }
    }
}

export default AuthServices;