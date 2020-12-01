const Stock = require('../models/Stock')
const { } = require('../../lib/utils')


module.exports = {
    index(req, res) {
        Stock.all(function (items) {

            return res.render('stock/index', { items })
        })
    },
    edit(req, res) {
        Stock.find(req.params.id, function (item) {
            if (!item) return res.send('Stock not found!')

            return res.render('stock/edit', { item })
        })
    },
    put(req, res) {
        // Validation
        if (req.body.quantity < 0) {
            return res.send('Please, insert a valid Quantity!')
        }

        Stock.update(req.body, function () {
            return res.redirect(`/stock`)
        })
    }
}