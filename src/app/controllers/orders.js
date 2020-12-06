const Order = require('../models/Order')
const Kit = require('../models/Kit')
const Client = require('../models/Client')
const { date } = require('../../lib/utils')

module.exports = {
    index(req, res) {
        Order.getAllOrders(function (orders) {
            orders = orders.map(function (order) {
                if (order.finish_date) {
                    order.finish_date = date(order.finish_date).format
                } else (
                    order.finish_date = "-"
                )

                return {
                    ...order,
                    start_date: date(order.start_date).format,
                }
            })

            return res.render('orders/index', { orders })
        })
    },
    create(req, res) {
        Client.all(function (clients) {
            return res.render('orders/create', { clients })
        })
    },
    post(req, res) {
        const newOrder = {
            ...req.body,
            start_date: date(Date.now()).iso,
            status: 'Criado'
        }

        Order.insertNewOrder(newOrder, function (order) {
            return res.redirect(`/orders/${order.id}`)
        })
    },
    show(req, res) {
        Order.findOrder(req.params.id, function (order) {
            Order.findItemsOfOrder(req.params.id, function (items) {
                return res.render('orders/show', { order, items })
            })
        })
    },
    delete(req, res) {
        Order.deleteAllItemsOfOrder(req.body.id, function () {
            Order.deleteOrder(req.body.id, function () {
                return res.redirect(`/orders`)
            })

        })
    },
    createItem(req, res) {
        Order.getAllItems(function (allItems) {
            Order.findOrder(req.params.id, function (order) {
                if (!order) return res.send('Order not found!')

                return res.render('orders/createItem', { allItems, order })
            })
        })
    },
    editItem(req, res) {
        Order.getAllItems(function (allItems) {
            Order.findItemOfOrder(req.params.id, function (item) {
                if (!item) return res.send('Items not found!')

                return res.render('orders/editItem', { item, allItems })
            })

        })
    },
    postItem(req, res) {
        // Validation
        if (req.body.item == "") {
            return res.send('Please, choose a Item!')
        }
        if (req.body.quantity <= 0) {
            return res.send('Please, insert a valid Quantity!')
        }

        req.body.item_id = Number(req.body.item_id)
        req.body.quantity = Number(req.body.quantity)
        req.body.order_id = Number(req.body.order_id)

        Order.createItemOfOrder(req.body, function () {
            Order.updateStatusOfOrder('Em produção', req.body.order_id, function () {
                return res.redirect(`/orders/${req.body.order_id}`)
            })
        })
    },
    putItem(req, res) {
        // Validation
        if (req.body.item == "") {
            return res.send('Please, choose a Item!')
        }
        if (req.body.quantity <= 0) {
            return res.send('Please, insert a valid Quantity!')
        }

        req.body.item_id = Number(req.body.item_id)
        req.body.quantity = Number(req.body.quantity)
        req.body.id = Number(req.body.id)

        Orders.updateItemOfOrder(req.body, function (order_id) {
            return res.redirect(`/orders/${order_id.order_id}`)
        })
    },
    deleteItem(req, res) {
        Order.deleteItemOfOrder(req.body.id, function (order_id) {
            return res.redirect(`/orders/${order_id.order_id}`)
        })
    },
    orderFinished(req, res) {
        Order.findItemsOfOrder(req.body.id, function (items) {
            for (item of items) {
                Order.getItemInStock(item.item_id, function (stockItem) {
                    const updatedItem = {
                        ...stockItem,
                        quantity: stockItem.quantity + item.quantity
                    }

                    Order.updateItemQuantityInStock(updatedItem.quantity, updatedItem.item_id, function () { })
                })
            }

            Order.updateStatusOfOrder('Pronto', req.body.id, function () {
                Order.updateFinishDateOfOrder(req.body.id, function () {
                    return res.redirect('/orders')
                })
            })
        })
    }
}