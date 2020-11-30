const express = require('express')
const routes = express.Router()
const items = require('./app/controllers/items')
const clients = require('./app/controllers/clients')
const kits = require('./app/controllers/kits')
const orders = require('./app/controllers/orders')
const stock = require('./app/controllers/stock')

routes.get('/', function(req, res) {
    return res.redirect('/items')
})

/* ITEMS */

routes.get('/items', items.index)
routes.get('/items/create', items.create)
routes.get('/items/:id/edit', items.edit)
routes.get('/items/:id', items.show)
routes.post('/items', items.post)
routes.put('/items', items.put)
routes.delete('/items', items.delete)

/* KITS */

routes.get('/kits', kits.index)
routes.get('/kits/create', kits.create)
routes.get('/kits/:id/createItem', kits.createItem)
routes.get('/kits/:id/edit', kits.edit)
routes.get('/kitsItems/:id/edit', kits.editItems)
routes.get('/kits/:id', kits.show)
routes.post('/kits', kits.post)
routes.post('/kitsItems', kits.postItems)
routes.put('/kits', kits.put)
routes.put('/kitsItems', kits.putItems)
routes.delete('/kits', kits.delete)
routes.delete('/kitsItems', kits.deleteItems)

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