const express = require('express')
const routes = express.Router()
const items = require('./app/controllers/items')
const clients = require('./app/controllers/clients')
const kits = require('./app/controllers/kits')
const orders = require('./app/controllers/orders')
const stock = require('./app/controllers/stock')
const packs = require('./app/controllers/packs')

routes.get('/', function (req, res) {
    return res.redirect('/orders')
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
routes.get('/kits/:id/duplicate', kits.duplicate)
routes.get('/kitsItems/:id/edit', kits.editItems)
routes.get('/kits/:id', kits.show)
routes.post('/kits', kits.post)
routes.post('/kitsItems', kits.postItems)
routes.put('/kits', kits.put)
routes.put('/kitsItems', kits.putItems)
routes.delete('/kits', kits.delete)
routes.delete('/kitsItems', kits.deleteItems)

/* CLIENTS */

routes.get('/clients', clients.index)
routes.get('/clients/create', clients.create)
routes.get('/clients/:id/edit', clients.edit)
routes.get('/clients/:id', clients.show)
routes.post('/clients', clients.post)
routes.put('/clients', clients.put)
routes.delete('/clients', clients.delete)

/* STOCK */

routes.get('/stock', stock.index) 
routes.get('/stock/:id/edit', stock.edit)
routes.put('/stock', stock.put)

/* PACKS */

routes.get('/packs', packs.index)
routes.get('/packs/create', packs.create)
routes.post('/packs', packs.post)
routes.get('/packs/:id', packs.show)
routes.get('/packs/:id/edit', packs.edit)
routes.put('/packs', packs.put)
routes.delete('/packs', packs.delete)
routes.get('/packs/:id/createItem', packs.createItem)
routes.get('/packsItems/:id/edit', packs.editItem)
routes.post('/packsItems', packs.postItem)
routes.put('/packsItems', packs.putItem)
routes.delete('/packsItems', packs.deleteItem)
routes.put('/packsStock', packs.packFinished)

/* ORDERS */

routes.get('/orders', orders.index)
routes.get('/orders/create', orders.create)
routes.post('/orders', orders.post)
routes.get('/orders/:id', orders.show)
routes.delete('/orders', orders.delete)
routes.get('/orders/:id/createItem', orders.createItem)
routes.get('/orders/:id/items', orders.showItemsOfOrder)
routes.get('/ordersItems/:id/edit', orders.editItem)
routes.post('/ordersItems', orders.postItem)
routes.put('/ordersItems', orders.putItem)
routes.delete('/ordersItems', orders.deleteItem)
routes.post('/orders/createPack', orders.createPack)
routes.put('/ordersStock', orders.orderFinished)


module.exports = routes