const Order = require('../models/Order')
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
        console.log(req.body)
        const newOrder = {
            ...req.body,
            start_date: date(Date.now()).iso,
            status: 'Criado'
        }

        Order.insertNewOrder(newOrder, function (order) {
            return res.redirect('/orders')
        })
    },
    show(req, res) {
        Order.findOrder(req.params.id, function (order) {
            return res.render('orders/show', { order })
        })
    },
    edit(req, res) {

    }
}