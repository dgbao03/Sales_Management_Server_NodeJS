import jwt from 'jsonwebtoken';

export const verifyJWT = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const accessToken = authHeader && authHeader.split(' ')[1];
    if (!accessToken) return res.sendStatus(401);

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        if (err) return res.sendStatus(403);

        req.data = data;
        req.employeeID = data.employee;
        req.role = data.role;
        
        next();
    });
}
