const Order = require('../models/Order')
const Kit = require('../models/Kit')
const Client = require('../models/Client')
const Stock = require('../models/Stock')
const { date } = require('../../lib/utils')
const Pack = require('../models/Pack')

async function getItemsOfOrder(id) {
    let itemsOfPack = []
    let results = await Order.findItemsOfOrderAA(id)
    let itemsOfOrder = results.rows
    let inItemsOfPack = false

    // Se o item não é kit, já vai direto para os items do pacote
    for (item of itemsOfOrder) {
        if (!item.kit) {
            itemsOfPack.push(item)
        }
    }

    // Aqui eu trato tudo que for kit
    for (item of itemsOfOrder) {
        if (item.kit) {
            results = await Kit.findItemsKitAA(item.item_id)

            results.rows = results.rows.map(function (itemOfKit) {
                return {
                    ...itemOfKit,
                    quantity: itemOfKit.quantity * item.quantity
                }
            })

            const itemsOfKit = results.rows

            for (itemOfKit of itemsOfKit) {
                if (itemsOfPack.length != 0) {
                    for (itemOfPack of itemsOfPack) {
                        if (itemOfPack.item_id == itemOfKit.item_id) {
                            inItemsOfPack = true
                            break
                        } else {
                            inItemsOfPack = false
                        }
                    }

                    if (!inItemsOfPack) {
                        itemsOfPack.push(itemOfKit)
                    } else {
                        for (itemOfPack of itemsOfPack) {
                            if (itemOfPack.item_id == itemOfKit.item_id) {
                                itemOfPack.quantity = itemOfPack.quantity + itemOfKit.quantity
                            }
                        }
                    }
                } else {
                    itemsOfPack.push(itemOfKit)
                }
            }
        }
    }

    return itemsOfPack
}

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

        Order.updateItemOfOrder(req.body, function (order_id) {
            return res.redirect(`/orders/${order_id.order_id}`)
        })
    },
    deleteItem(req, res) {
        Order.deleteItemOfOrder(req.body.id, function (order_id) {
            return res.redirect(`/orders/${order_id.order_id}`)
        })
    },
    async createPack(req, res) {
        let results

        // Aqui eu consigo todos os itens do pedido, sendo partes de kits ou não
        results = await getItemsOfOrder(req.body.order_id)
        const itemsOfOrder = results

        // Para cada item
        for (itemOfOrder of itemsOfOrder) {
            let quantityOfItem

            // Somar o estoque com todas as vezes que estiver em um pacote

            // Pegar a quantidade daquele item disponível no estoque
            results = await Stock.findItemByItemId(itemOfOrder.item_id)
            let itemInStock = results.rows[0]
            quantityOfItem = itemInStock.quantity

            // Pegar todos os pacotes em produção
            results = await Pack.getPacksInProduction()
            let packsInProduction = results.rows

            // Para cada pacote, verificar se há o item
            // Se houver, somar a quantidade
            for (pack of packsInProduction) {
                results = await Pack.findItemsOfPackAA(pack.id)
                const itemsOfPack = results.rows

                for (itemOfPack of itemsOfPack) {
                    if (itemOfPack.item_id == itemOfOrder.item_id) {
                        quantityOfItem += itemOfPack.quantity
                    }
                }
            }

            // Subtrair de todas as vezes que estiver em um pedido

            // Pegar todos os pedidos em producão
            results = await Order.getOrdersInProduction()
            let ordersInProduction = results.rows

            // Para cada pedido, verificar se há o item
            // Se houver, diminuir a quantidade
            if (ordersInProduction.length != 0) {
                for (orderInProduction of ordersInProduction) {
                    if (orderInProduction.id != req.body.order_id) {
                        let itemsOfOrderInProduction = await getItemsOfOrder(orderInProduction.id)
                        for (itemOfOrderInProduction of itemsOfOrderInProduction) {
                            if (itemOfOrderInProduction.item_id == itemOfOrder.item_id) {
                                quantityOfItem -= itemOfOrderInProduction.quantity
                            }
                        }
                    }
                }
            }

            if (quantityOfItem > 0) {
                itemOfOrder.quantity -= quantityOfItem
            }

        }

        results = await Pack.createPackAA(`Pacote do pedido n° ${req.body.order_id}`)
        const pack_id = results.rows[0]
        let newItemsOfOrder = itemsOfOrder

        newItemsOfOrder = newItemsOfOrder.map(function (item) {
            return {
                ...item,
                pack_id: pack_id.id
            }
        })

        for (item of newItemsOfOrder) {
            if (item.quantity > 0) {
                results = await Pack.createItemOfPackAA(item)
            }
        }

        Pack.findPack(pack_id.id, function (pack) {
            if (!pack) return res.send('Pack not found!')

            Pack.findItemsOfPack(pack_id.id, function (items) {
                if (!items) return res.send('Items not found!')

                Pack.updateStatusOfPack("Em produção", pack_id.id, function () {
                    return res.redirect(`/packs/${pack_id.id}`)
                })

            })
        })
    },
    async orderFinished(req, res) {
        let results

        // Aqui eu consigo todos os itens do pedido, sendo partes de kits ou não
        results = await getItemsOfOrder(req.body.order_id)
        const itemsOfOrder = results

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
                return res.redirect('/orders')
            })
        })
    },
    async showItemsOfOrder(req, res) {
        let results

        // Aqui eu consigo todos os itens do pedido, sendo partes de kits ou não
        results = await getItemsOfOrder(req.params.id)
        const itemsOfOrder = results
        const orderId = Number(req.params.id)

        return res.render('orders/showItemsOfKit', {itemsOfOrder, orderId})
    }
}