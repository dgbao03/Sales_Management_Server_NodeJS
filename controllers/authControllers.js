import AuthServices from '../services/AuthServices.js';

// Username is Employee's Phone Number
export const login = async (req, res) => {
    try {
        const { phone, password } = req.body;
        const { accessToken, refreshToken } = await AuthServices.login(phone, password);
        
        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
        res.status(200).json({ message: 'Login Successful!', accessToken });
    } catch (error) {
        if (error.message === '404-NOTFOUND') {
            res.status(404).json({ message: 'Employee not found! Please try again!' });
        } else if (error.message === '400-PASS') {
            res.status(401).json({ message: 'Password is incorrect! Please try again!' });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
}

export const logout = async (req, res) => {
    try {
        const cookies = req.cookies;
        if (!cookies?.jwt) {
            return res.status(401).json({ message: 'Unauthorized!' });
        }

        const refreshToken = cookies.jwt;
        await AuthServices.logout(refreshToken);

        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.status(200).json({ message: 'Logout Successful!' });
    } catch (error) {
        res.status(500).json({ message: 'Logout Failed! Please try again!' });
    }
}

