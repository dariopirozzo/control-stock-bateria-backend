const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, loginUser, revalidateUser } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-token');

const router = Router();

// Login
router.post(
    '/',
    [
        check('email', 'The email is required').not().isEmpty(),
        check('password', 'Password must have at least 5 characters').isLength({ min: 5 }),
        validateFields,
    ],
    loginUser
);

// Registro
router.post(
    '/new',
    [
        check('nombre', 'The name is required').not().isEmpty(),
        check('email', 'The email is required').isEmail(),
        check('password', 'Password must have at least 5 characters').isLength({ min: 5 }),
        validateFields,
    ],
    createUser
);

// Token renewal
router.get('/renew', validateJWT, revalidateUser);

module.exports = router;
