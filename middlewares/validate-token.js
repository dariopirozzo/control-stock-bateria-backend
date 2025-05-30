// middlewares/validate-token.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'mysecretkey';

const validateJWT = (req, res, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({ msg: 'No token provided' });
    }

    try {
        const { uid, nombre } = jwt.verify(token, JWT_SECRET);
        req.uid = uid;
        req.nombre = nombre;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ msg: 'Invalid token' });
    }
};

module.exports = {
    validateJWT
};
