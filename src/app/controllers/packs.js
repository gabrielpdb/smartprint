const Pack = require('../models/Pack')
const { date } = require('../../lib/utils')

module.exports = {
    index(req, res) {
        Pack.getAllPacks(function (packs) {
            packs = packs.map(function (pack) {
                if (pack.finish_date) {
                    pack.finish_date = date(pack.finish_date).format
                } else (
                    pack.finish_date = "-"
                )

                return {
                    ...pack,
                    start_date: date(pack.start_date).format,
                }
            })

            return res.render('packs/index', { packs })
        })
    },
    create(req, res) {
        return res.render('packs/create')
    },
    post(req, res) {
        // Validation
        if (req.body.description == "") {
            return res.send('Please, insert a Pack Description!')
        }

        Pack.createPack(req.body, function (pack) {
            return res.redirect(`/packs/${pack.id}`)
        })
    },
    show(req, res) {
        Pack.findPack(req.params.id, function (pack) {
            if (!pack) return res.send('Pack not found!')

            Pack.findItemsOfPack(req.params.id, function (items) {
                if (!items) return res.send('Items not found!')

                return res.render('packs/show', { pack, items })
            })
        })
    },
    edit(req, res) {
        Pack.findPack(req.params.id, function (pack) {
            if (!pack) return res.send('Pack not found!')

            Pack.findItemsOfPack(req.params.id, function (items) {
                if (!items) return res.send('Items not found!')

                return res.render('packs/edit', { pack, items })
            })
        })
    },
    put(req, res) {
        // Validation
        if (req.body.description == "") {
            return res.send('Please, insert a Pack Description!')
        }

        Pack.updatePack(req.body, function () {
            return res.redirect(`/packs/${req.body.id}`)
        })
    },
    delete(req, res) {
        Pack.deleteAllItemsOfPack(req.body.id, function () {
            Pack.deletePack(req.body.id, function () {
                return res.redirect(`/packs`)
            })

        })
    },
    createItem(req, res) {
        Pack.getAllItems(function (allItems) {
            Pack.findPack(req.params.id, function (pack) {
                if (!pack) return res.send('Pack not found!')

                return res.render('packs/createItem', { allItems, pack })
            })
        })
    },
    editItem(req, res) {
        Pack.getAllItems(function (allItems) {
            Pack.findItemOfPack(req.params.id, function (item) {
                if (!item) return res.send('Items not found!')

                return res.render('packs/editItem', { item, allItems })
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
        req.body.pack_id = Number(req.body.pack_id)

        Pack.createItemOfPack(req.body, function () {
            Pack.updateStatusOfPack('Em produção', req.body.pack_id, function () {
                return res.redirect(`/packs/${req.body.pack_id}`)
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

        Pack.updateItemOfPack(req.body, function (pack_id) {
            return res.redirect(`/packs/${pack_id.pack_id}`)
        })
    },
    deleteItem(req, res) {
        Pack.deleteItemOfPack(req.body.id, function (pack_id) {
            return res.redirect(`/packs/${pack_id.pack_id}`)
        })
    },
    packFinished(req, res) {
        Pack.findItemsOfPack(req.body.id, function (items) {
            for (item of items) {
                Pack.getItemInStock(item.item_id, function (stockItem) {
                    const updatedItem = {
                        ...stockItem,
                        quantity: stockItem.quantity + item.quantity
                    }

                    Pack.updateItemQuantityInStock(updatedItem.quantity, updatedItem.item_id, function () { })
                })
            }

            Pack.updateStatusOfPack('Pronto', req.body.id, function () {
                Pack.updateFinishDateOfPack(req.body.id, function () {
                    return res.redirect('/packs')
                })
            })
        })
    }
}