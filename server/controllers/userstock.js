const UserStock = require('../models/userstock');
const Stock = require('../models/stock');


exports.buyStock = async (req, res, next) => {
    try {
        const title = req.body.title;
        const price = req.body.price;
        const quantity = req.body.quantity;
        const userId = req.body.userId;
        const stock = await Stock.findById(req.body._id);
        if (quantity < 0) {
            const error = new Error('Invalid quantity');
            res.status(400).json({
                message: error
            });
        }
        if (!stock) {
            const error = new Error('Stock not found');
            res.status(400).json({
                message: error
            });
        }
        const qty = stock.quantity - quantity;
        if (qty < 0) {
            const error = new Error('Insufficient stock');
            res.status(400).json({
                message: error
            });
        }
        stock.quantity = qty;
        const isStock = await UserStock.findOne({ title: title, user: userId });
        stock.save();
        if (!isStock) {
            const userstock = new UserStock({
                user: userId,
                title: title,
                price: price,
                quantity: quantity
            })
            const result = await userstock.save();
            return res.status(201).json({ message: 'Purchase successful!', userstock: userstock, stock: stock })
        }
        isStock.quantity = isStock.quantity + quantity;
        const result = await isStock.save();
        res.status(201).json({ message: 'Purchase successful!', userstock: isStock, stock: stock })

    }
    catch (err) {
        res.status(500).json({ error: err });
    }
}

exports.sellStock = async (req, res, next) => {
    try {
        const userStockId = req.params.stockId;
        const qty = req.body.quantity;
        
        if (req.body.quantity <= 0) {
            const error = new Error('Invalid quantity');
            return res.status(400).json({
                message: error
            });
        }
        const userstock = await UserStock.findById(userStockId);
        const stock = await Stock.findOne({ title: req.body.title });
        if(userstock.quantity - qty < 0) {
            const error = new Error('Invalid quantity');
            return res.status(400).json({
                message: error
            });
        }

        userstock.quantity = userstock.quantity - qty;
        stock.quantity = stock.quantity + qty;

        userstock.save();
        stock.save();
        console.log(userstock);
        console.log(stock);
        res.status(201).json({
            message: 'Sold successfully!', userstock: userstock, stock: stock 
        })
    }
    catch (err) {
        res.status(500).json({ error: error });
    };
}


exports.getStockByUser = async (req, res, next) => {
    const userId = req.params.userId;
    try {
        const stocks = await UserStock.find({ user: userId });
        const data = stocks.map(stock => {
            return {
                _id: stock._id,
                title: stock.title,
                price: stock.price,
                quantity: stock.quantity
            }
        })
        res.status(200).json({
            total: stocks.length,
            stocks: data
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
        const stocks = await UserStock.find();
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