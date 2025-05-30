// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarios');

// Puedes mover esta secret a .env
const JWT_SECRET = process.env.JWT_SECRET || 'mysecretkey';

const generateJWT = (uid, nombre) => {
    return jwt.sign({ uid, nombre }, JWT_SECRET, { expiresIn: '2h' });
};

const createUser = async (req, res) => {
    const { nombre, email, password, rol } = req.body;

    try {
        const existingUser = await Usuario.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ msg: 'User already exists with that email' });
        }

        const salt = bcrypt.genSaltSync();
        const hashedPassword = bcrypt.hashSync(password, salt);

        const user = await Usuario.create({
            nombre,
            email,
            password: hashedPassword,
            rol: rol || 'staff', // valor por defecto
        });

        const token = generateJWT(user.id, user.nombre);

        res.status(201).json({
            uid: user.id,
            nombre: user.nombre,
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Usuario.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({ msg: 'User not found with that email' });
        }

        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({ msg: 'Incorrect password' });
        }

        const token = generateJWT(user.id, user.nombre);

        res.json({
            uid: user.id,
            nombre: user.nombre,
            token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
};

const revalidateUser = async (req, res) => {
    const { uid, nombre } = req;

    const token = generateJWT(uid, nombre);

    res.json({ uid, nombre, token });
};

module.exports = {
    createUser,
    loginUser,
    revalidateUser
};
