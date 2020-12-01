const db = require('../../config/db')
const { } = require('../../lib/utils')

module.exports = {
    all(callback) {
        db.query(`
        SELECT *
        FROM items
        WHERE kit = true
        ORDER BY description ASC
        `, function (err, results) {
            if (err) throw `Database Error! ${err}`

            callback(results.rows)
        })
    },
    allItems(callback) {
        db.query(`
        SELECT *
        FROM items
        WHERE kit = false
        ORDER BY description ASC
        `, function (err, results) {
            if (err) throw `Database Error! ${err}`

            callback(results.rows)
        })
    },
    create(data, callback) {
        const query = `
            INSERT INTO items (
                description,
                kit
            ) VALUES ($1, $2)
            RETURNING id
        `
        const values = [
            data.description,
            true
        ]

        db.query(query, values, function (err, results) {
            if (err) throw `Database Error! ${err}`

            callback(results.rows[0])
        })

    },
    createItems(data, callback) {
        const query = `
            INSERT INTO kit_items (
                quantity,
                item_id,
                kit_id
            ) VALUES ($1, $2, $3)
        `
        const values = [
            data.quantity,
            data.item_id,
            data.kit_id
        ]

        db.query(query, values, function (err, results) {
            if (err) throw `Database Error! ${err}`

            callback()
        })
    },
    findKit(id, callback) {
        db.query(`
            SELECT *
            FROM items
            WHERE kit = true AND id = $1
        `, [id], function (err, results) {
            if (err) throw `Database Error! ${err}`

            callback(results.rows[0])
        })
    },
    findItemsKit(id, callback) {

        db.query(`
            SELECT kit_items.id, items.description, kit_items.quantity 
            FROM items
            JOIN kit_items ON items.id = kit_items.item_id
            WHERE kit_items.kit_id = $1
        `, [id], function (err, results) {
            if (err) throw `Database Error! ${err}`

            callback(results.rows)
        })
    },
    findItemOfKit(id, callback) {
        db.query(`
            SELECT kit_items.*, items.description
            FROM kit_items
            JOIN items ON kit_items.item_id = items.id
            WHERE kit_items.id = $1
        `, [id], function (err, results) {
            if (err) throw `Database Error! ${err}`

            callback(results.rows[0])
        })
    },
    update(data, callback) {
        const query = `
            UPDATE items 
            SET
                description = ($1)
            WHERE id = $2
        `
        const values = [
            data.description,
            data.id
        ]

        db.query(query, values, function (err, results) {
            if (err) throw `Database Error! ${err}`

            callback()
        })
    },
    updateItemOfKit(data, callback) {
        const query = `
            UPDATE kit_items
            SET
                quantity = ($1),
                item_id = ($2)
            WHERE id = $3
            RETURNING kit_id
        `
        const values = [
            data.quantity,
            data.item_id,
            data.id
        ]

        db.query(query, values, function (err, results) {
            if (err) throw `Database Error! ${err}`

            callback(results.rows[0])
        })
    },
    delete(id, callback) {
        db.query(`
        DELETE FROM items WHERE kit = true AND id = $1
        `, [id], function (err, results) {
            if (err) throw `Database Error! ${err}`

            return callback()
        })
    },
    deleteAllItemsOfKit(kit_id, callback) {
        db.query(`
        DELETE FROM kit_items WHERE kit_id = $1;
        `, [kit_id], function (err, results) {
            if (err) throw `Database Error! ${err}`

            return callback()
        })
    },
    deleteItemOfKit(id, callback) {
        db.query(`
            DELETE FROM kit_items
            WHERE id = $1
            RETURNING kit_id
        `, [id], function (err, results) {
            if (err) throw `Database Error! ${err}`

            callback(results.rows[0])
        })
    }
}