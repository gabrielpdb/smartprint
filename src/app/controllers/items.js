const Item = require('../models/Item')
const { } = require('../../lib/utils')


module.exports = {
    index(req, res) {
        Item.all(function (items) {
            return res.render('items/index', { items })
        })
    },
    create(req, res) {
        return res.render('items/create')
    },
    post(req, res) {
        // Validation
        if (req.body.description == "") {
            return res.send('Please, insert a Item Description!')
        }

        if (req.body.height == "") req.body.height = 0
        if (req.body.width == "") req.body.width = 0

        Item.create(req.body, function (item) {
            return res.redirect(`/items/${item.id}`)
        })
    },
    show(req, res) {
        Item.find(req.params.id, function (item) {
            if (!item) return res.send('Item not found!')

            return res.render('items/show', { item })
        })
    },
    edit(req, res) {
        Item.find(req.params.id, function (item) {
            if (!item) return res.send('Item not found!')

            return res.render('items/edit', { item })
        })
    },
    put(req, res) {
        // Validation
        if (req.body.description == "") {
            return res.send('Please, insert a Item Description!')
        }

        if (req.body.height == "") req.body.height = 0
        if (req.body.width == "") req.body.width = 0

        Item.update(req.body, function () {
            return res.redirect(`/items/${req.body.id}`)
        })
    },
    delete(req, res) {
        Item.delete(req.body.id, function () {
            return res.redirect(`/items`)
        })
    }
}