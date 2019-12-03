const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

exports.signup = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ message: 'Validation Failed', errors: errors.array() });
        }
        const email = req.body.email;
        const name = req.body.name;
        const password = req.body.password;
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({
            email: email,
            name: name,
            password: hashedPassword
        });
        const result = await user.save();
        res.status(201).json({
            message: 'Registration successful!',
            userId: result._id
        })
    }
    catch (err) {
        res.status(500).json(err);
    };
};

exports.login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: `User with email ${email} not found` });
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            return res.status(401).json({ message: 'Invalid email or password!' });
        }
        const token = jwt.sign(
            {
                email: user.email,
                userId: user._id.toString()
            },
            'supersupersupersecret',
            {
                expiresIn: '12h'
            }

        )
        res.status(200).json({
            token: token,
            userId: user._id.toString()
        });
    }
    catch (err) {
        if (!err.status) {
            err.status = 500
        }
        next(err);
    };
}

exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({
            total: users.length,
            users: users
        })
    }
    catch (err) {
        if (!err.status) {
            err.status = 500
        }
        next(err);
    };
}