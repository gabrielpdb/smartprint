const express = require('express')
const routes = express.Router()
const items = require('./items')

routes.get('/', function(req, res) {
    return res.redirect('/home')
})

routes.get('/home', function (req, res) {
    return res.render('home')
})

/* ITEMS */

routes.get('/items', function (req, res) {
    return res.render('items/index')
})

routes.get('/items/create', function (req, res) {
    return res.render('items/create')
})

routes.get('/items/:id/edit', items.edit)

routes.get('/items/:id', items.show)

routes.post('/items', items.post)

routes.put('/items', items.put)

routes.delete('/items', items.delete)

/* KITS */

routes.get('/kits', function (req, res) {
    return res.render('kits/index')
})

routes.get('/kits/create', function (req, res) {
    return res.render('kits/create')
})

/* ORDERS */

routes.get('/orders', function (req, res) {
    return res.render('orders/index')
})

/* STOCK */

routes.get('/stock', function (req, res) {
    return res.render('stock/index')
})

/* CLIENTS */

routes.get('/clients', function (req, res) {
    return res.render('clients/index')
})





module.exports = routes