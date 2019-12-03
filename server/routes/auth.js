const express = require('express');
const router = express.Router();
const { check, body } = require('express-validator');
const authController = require('../controllers/auth');
const User = require('../models/user');

router.post('/signup', [
    body('email')
        .isEmail()
        .withMessage('Please enter valid email.')
        .custom((value, { req }) => {
            return User.findOne({ email: value }).then(user => {
                if (user) {
                    return Promise.reject('Email already exists.');
                }
            })
        })
        .normalizeEmail(),
    body('password')
        .trim()
        .isLength({ min: 6 }),
    body('name')
        .trim()
        .not()
        .isEmpty()
], authController.signup);

router.post('/login', authController.login);
router.get('/load', authController.getUsers)


module.exports = router;