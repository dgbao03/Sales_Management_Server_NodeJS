export const verifyRole = (allowedRole) => {
    return (req, res, next) => {
        if (!req?.role) return res.sendStatus(401);

        if (req.role != allowedRole) return res.status(403).send('You are not allowed to access this resource!');

        next();
    }
}