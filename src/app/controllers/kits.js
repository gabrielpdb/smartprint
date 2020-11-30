const Kit = require('../models/Kit')
const { } = require('../../lib/utils')
const { allItems } = require('../models/Kit')


module.exports = {
    index(req, res) {
        Kit.all(function (kits) {
            return res.render('kits/index', { kits })
        })
    },
    create(req, res) {
        return res.render('kits/create')
    },
    createItem(req, res) {

        Kit.allItems(function (allItems) {
            Kit.findKit(req.params.id, function (kit) {
                if (!kit) return res.send('Kit not found!')

                return res.render('kits/createItem', { allItems, kit })
            })
        })
    },
    post(req, res) {
        // Validation
        if (req.body.description == "") {
            return res.send('Please, insert a Kit Description!')
        }

        Kit.create(req.body, function (kit) {
            return res.redirect(`/kits/${kit.id}`)
        })
    },
    postItems(req, res) {
        // Validation
        if (req.body.item == "") {
            return res.send('Please, choose a Item!')
        }
        if (req.body.quantity <= 0) {
            return res.send('Please, insert a valid Quantity!')
        }

        req.body.item_id = Number(req.body.item_id)
        req.body.quantity = Number(req.body.quantity)
        req.body.kit_id = Number(req.body.kit_id)


        Kit.createItems(req.body, function () {
            return res.redirect(`/kits/${req.body.kit_id}`)
        })
    },
    show(req, res) {
        Kit.findKit(req.params.id, function (kit) {
            if (!kit) return res.send('Kit not found!')

            Kit.findItemsKit(req.params.id, function (items) {
                if (!items) return res.send('Items not found!')

                return res.render('kits/show', { kit, items })
            })
        })

    },
    edit(req, res) {
        Kit.findKit(req.params.id, function (kit) {
            if (!kit) return res.send('Kit not found!')

            Kit.findItemsKit(req.params.id, function (items) {
                if (!items) return res.send('Items not found!')

                return res.render('kits/edit', { kit, items })
            })
        })
    },
    editItems(req, res) {
        Kit.allItems(function (allItems) {
            Kit.findItemOfKit(req.params.id, function (item) {
                if (!item) return res.send('Items not found!')

                return res.render('kits/editItem', { item, allItems })
            })

        })

    },
    put(req, res) {
        // Validation
        if (req.body.description == "") {
            return res.send('Please, insert a Kit Description!')
        }

        Kit.update(req.body, function () {
            return res.redirect(`/kits/${req.body.id}`)
        })
    },
    putItems(req, res) {
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

        Kit.updateItemOfKit(req.body, function (kit_id) {
            return res.redirect(`/kits/${kit_id.kit_id}`)
        })

    },
    delete(req, res) {

        Kit.deleteAllItemsOfKit(req.body.id, function () {
            Kit.delete(req.body.id, function () {
                return res.redirect(`/kits`)
            })

        })

    },
    deleteItems(req, res) {
        Kit.deleteItemOfKit(req.body.id, function (kit_id) {
            return res.redirect(`/kits/${kit_id.kit_id}`)
        })
    }
}