const Stock = require('../models/stock');
const { validationResult } = require('express-validator');



exports.postStock = async (req, res, next) => {
    const title = req.body.title;
    const quantity = req.body.quantity;
    const price = req.body.price;
    try {
        const stock = await Stock.findOne({ title: title });
        if (stock) {
            const error = new Error('Stock with title' + stock.title + 'already exists');
            error.status = 422;
            throw error;
        }
        const newstock = new Stock({
            title: title,
            quantity: quantity,
            price: price
        });
        const result = await newstock.save();
        res.status(201).json({
            message: 'Stock created successfully',
            stockId: result._id
        })
    }
    catch (err) {
        if (!err.status) {
            err.status = 500
        }
        next(err);
    };

}

exports.getStock = async (req, res, next) => {
    try {
        const result = await Stock.find();
        const stocks = result.map(stock => {
            return {
                _id: stock._id,
                title: stock.title,
                price: stock.price,
                quantity: stock.quantity
            }
        });
        res.status(200).json({
            total: stocks.length,
            stocks: stocks
        })
    }
    catch (err) {
        if (!err.status) {
            err.status = 500
        }
        next(err);
    };
}


exports.updateStock = async (req, res, next) => {
    const id = req.params.stockId;
    const title = req.body.title;
    const quantity = req.body.quantity;
    const price = req.body.price;
    try {
        const stock = await Stock.findById(id);
        if (!stock) {
            const error = new Error('Stock not found');
            error.status = 404;
            throw error;
        }
        stock.title = title;
        stock.quantity = quantity;
        stock.price = price;
        const result = await stock.save();
        res.status(201).json({
            message: 'Stock updated successfully',
            stockId: result._id
        })
    }
    catch (err) {
        if (!err.status) {
            err.status = 500
        }
        next(err);
    };
}

exports.deleteStock = async (req, res, next) => {
    const id = req.params.stockId
    try {
        const result = Stock.remove({ _id: id })
        res.status(200).json({
            message: 'Stock delted',
        });
    }
    catch (err) {
        if (!err.status) {
            err.status = 500
        }
        next(err);
    };

}