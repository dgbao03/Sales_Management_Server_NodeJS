import jwt from 'jsonwebtoken';
import AuthServices from '../services/AuthServices.js';

export const handleRefreshToken = async (req, res) => {
    try {
        const cookies = req.cookies;
        if (!cookies?.jwt) {
            return res.sendStatus(401);
        }
        
        const refreshToken = cookies.jwt;
        const newAccessToken = await AuthServices.verifyRefreshToken(refreshToken);
        if (!newAccessToken) {
            return res.sendStatus(500);
        }

        return res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
        if (error.message === '403') {
            res.sendStatus(403)
        } else {
            res.status(500).json({ message: 'Internal Server Error!' });
        }
    }   
}