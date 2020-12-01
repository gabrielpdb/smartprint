const Client = require('../models/Client')
const { } = require('../../lib/utils')


module.exports = {
    index(req, res) {
        Client.all(function (clients) {
            return res.render('clients/index', { clients })
        })
    },
    create(req, res) {
        return res.render('clients/create')
    },
    post(req, res) {
        // Validation
        if (req.body.name == "") {
            return res.send('Please, insert a Client Name!')
        }

        Client.create(req.body, function (client) {
            return res.redirect(`/clients/${client.id}`)
        })
    },
    show(req, res) {
        Client.find(req.params.id, function (client) {
            if (!client) return res.send('Client not found!')

            return res.render('clients/show', { client })
        })
    },
    edit(req, res) {
        Client.find(req.params.id, function (client) {
            if (!client) return res.send('Client not found!')

            return res.render('clients/edit', { client })
        })
    },
    put(req, res) {
        // Validation
        if (req.body.name == "") {
            return res.send('Please, insert a Client Name!')
        }

        Client.update(req.body, function () {
            return res.redirect(`/clients/${req.body.id}`)
        })
    },
    delete(req, res) {
        Client.delete(req.body.id, function () {
            return res.redirect(`/clients`)
        })
    }
}