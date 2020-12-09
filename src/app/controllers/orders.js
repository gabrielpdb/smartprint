const Order = require('../models/Order')
const Kit = require('../models/Kit')
const Client = require('../models/Client')
const Stock = require('../models/Stock')
const { date } = require('../../lib/utils')
const Pack = require('../models/Pack')
const packs = require('./packs')

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
    async createPack(req, res) {
        let itemsOfPack = []
        let preItemsOfPack = []
        let results = await Order.findItemsOfOrderAA(req.body.order_id)
        let itemsOfOrder = results.rows


        for (item of itemsOfOrder) {
            if (!item.kit) {
                itemsOfPack.push(item)
            } else {
                results = await Kit.findItemsKitAA(item.item_id)

                results.rows = results.rows.map(function (itemOfKit) {
                    return {
                        ...itemOfKit,
                        quantity: itemOfKit.quantity * item.quantity
                    }
                })

                const itemsOfKit = results.rows

                for (itemOfKit of itemsOfKit) {
                    for (itemOfPack of itemsOfPack) {
                        if (itemOfPack.item_id == itemOfKit.item_id) {
                            itemOfPack.quantity = itemOfPack.quantity + itemOfKit.quantity
                        } else if (itemOfPack.item_id != itemOfKit.item_id) {
                            preItemsOfPack.push(itemOfKit)
                        }
                    }
                }

                for (item of preItemsOfPack) {
                    itemsOfPack.push(item)
                }

            }
        }

        itemsOfOrder = itemsOfPack

        // Até aqui eu tenho todos os itens necessários do pedido

        for (item of itemsOfPack) {
            results = await Stock.findItemByItemId(item.item_id)

            item.quantity = item.quantity - results.rows[0].quantity
        }

        // Aqui eu descontei o que tinha no estoque

        results = await Pack.createPackAA(`Pacote do pedido n° ${req.body.order_id}`)
        const pack_id = results.rows[0]
        itemsOfPack = itemsOfPack.map(function (item) {
            return {
                ...item,
                pack_id: pack_id.id
            }
        })

        for (item of itemsOfPack) {
            if (item.quantity > 0) {
                results = await Pack.createItemOfPackAA(item)
                
                console.log('item of pack')
                console.log(item)
            }
        }

        /* Pack.findPack(pack_id.id, function (pack) {
            if (!pack) return res.send('Pack not found!')

            Pack.findItemsOfPack(pack_id.id, function (items) {
                if (!items) return res.send('Items not found!')

                return res.redirect(`/packs/${pack_id.id}`)

            })
        }) */
    },
    async orderFinished(req, res) {
        let itemsOfPack = []
        let preItemsOfPack = []
        let results = await Order.findItemsOfOrderAA(req.body.order_id)
        let itemsOfOrder = results.rows


        for (item of itemsOfOrder) {
            if (!item.kit) {
                itemsOfPack.push(item)
            } else {
                results = await Kit.findItemsKitAA(item.item_id)

                results.rows = results.rows.map(function (itemOfKit) {
                    return {
                        ...itemOfKit,
                        quantity: itemOfKit.quantity * item.quantity
                    }
                })

                const itemsOfKit = results.rows

                for (itemOfKit of itemsOfKit) {
                    for (itemOfPack of itemsOfPack) {
                        if (itemOfPack.item_id == itemOfKit.item_id) {
                            itemOfPack.quantity = itemOfPack.quantity + itemOfKit.quantity
                        } else if (itemOfPack.item_id != itemOfKit.item_id) {
                            preItemsOfPack.push(itemOfKit)
                        }
                    }
                }

                for (item of preItemsOfPack) {
                    itemsOfPack.push(item)
                }

            }
        }

        itemsOfOrder = itemsOfPack

        for (item of itemsOfOrder) {
            results = await Order.getItemInStock(item.item_id)
            const stockItem = results.rows[0]
            const updatedItem = {
                ...stockItem,
                quantity: stockItem.quantity - item.quantity
            }

            await Order.updateItemQuantityInStock(updatedItem.quantity, updatedItem.item_id)
        }



        Order.updateStatusOfOrder('Pronto', req.body.order_id, function () {
            Order.updateFinishDateOfOrder(req.body.order_id, function () {
                return res.redirect('/packs')
            })
        })
    }
}