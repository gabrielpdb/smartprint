const db = require('../../config/db')
const { date } = require('../../lib/utils')


module.exports = {
    getAllOrders(callback) {
        db.query(`
            SELECT orders.*, clients.name AS client_name 
            FROM orders
            JOIN clients ON orders.client_id = clients.id
        `, function (err, results) {
            if (err) throw `Database Error! ${err}`

            callback(results.rows)
        })
    },
    insertNewOrder(order, callback) {
        db.query(`
            INSERT INTO orders (
                start_date,
                client_id,
                status
            ) VALUES ($1, $2, $3)
            RETURNING id
        `, [order.start_date, order.client_id, order.status], function (err, results) {
            if (err) throw `Database Error! ${err}`

            callback(results.rows[0])
        })
    },
    findOrder(id, callback) {
        db.query(`
            SELECT * 
            FROM orders 
            WHERE id = $1
        `, [id], function (err, results) {
            if (err) throw `Database Error! ${err}`

            callback(results.rows[0])
        })
    },
    findItemsOfOrder(id, callback) {
        db.query(`
            SELECT order_items.id, items.id AS item_id, items.description, items.kit, order_items.quantity, order_items.order_id
            FROM order_items
            JOIN items ON items.id = order_items.item_id
            WHERE order_id = $1
        `, [id], function (err, results) {
            if (err) throw `Database Error! ${err}`

            return callback(results.rows)
        })
    },
    findItemsOfOrderAA(id) {
        return db.query(`
            SELECT order_items.id, items.id AS item_id, items.description, items.kit, order_items.quantity, order_items.order_id
            FROM order_items
            JOIN items ON items.id = order_items.item_id
            WHERE order_id = $1
        `, [id])
    },
    findItemOfOrder(id, callback) {
        db.query(`
            SELECT order_items.*, items.description
            FROM order_items
            JOIN items ON order_items.item_id = items.id
            WHERE order_items.id = $1
        `, [id], function (err, results) {
            if (err) throw `Database Error! ${err}`

            callback(results.rows[0])
        })
    },
    deleteOrder(id, callback) {
        db.query(`
        DELETE FROM orders WHERE id = $1
        `, [id], function (err, results) {
            if (err) throw `Database Error! ${err}`

            return callback()
        })
    },
    deleteAllItemsOfOrder(order_id, callback) {
        db.query(`
        DELETE FROM order_items WHERE order_id = $1;
        `, [order_id], function (err, results) {
            if (err) throw `Database Error! ${err}`

            return callback()
        })
    },
    getAllItems(callback) {
        db.query(`
        SELECT *
        FROM items
        ORDER BY description ASC
        `, function (err, results) {
            if (err) throw `Database Error! ${err}`

            callback(results.rows)
        })
    },
    createItemOfOrder(data, callback) {
        const query = `
            INSERT INTO order_items (
                quantity,
                item_id,
                order_id
            ) VALUES ($1, $2, $3)
        `
        const values = [
            data.quantity,
            data.item_id,
            data.order_id
        ]

        db.query(query, values, function (err, results) {
            if (err) throw `Database Error! ${err}`

            callback()
        })
    },
    updateItemOfOrder(data, callback) {
        const query = `
            UPDATE order_items
            SET
                quantity = ($1),
                item_id = ($2)
            WHERE id = $3
            RETURNING order_id
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
    deleteItemOfOrder(id, callback) {
        db.query(`
            DELETE FROM order_items
            WHERE id = $1
            RETURNING order_id
        `, [id], function (err, results) {
            if (err) throw `Database Error! ${err}`

            callback(results.rows[0])
        })
    },
    updateStatusOfOrder(status, id, callback) {
        db.query(`
            UPDATE orders
            SET
                status = ($1)
            WHERE id = $2
        `, [status, id], function (err, results) {
            if (err) throw `Database Error! ${err}`

            callback()
        })
    },
    updateFinishDateOfOrder(id, callback) {
        db.query(`
            UPDATE orders
            SET
                finish_date = ($1)
            WHERE id = $2
        `, [date(Date.now()).iso, id], function (err, results) {
            if (err) throw `Database Error! ${err}`

            callback()
        })
    },
    getItemInStock(id) {
        return db.query(`
            SELECT item_id, quantity FROM stock WHERE item_id = $1
        `, [id])
    },
    updateItemQuantityInStock(quantity, item_id) {
        return db.query(`
            UPDATE stock
            SET
                quantity = ($1)
            WHERE item_id = $2
        `, [quantity, item_id])
    },
    updateFinishDateOfPack(id, callback) {
        db.query(`
            UPDATE packs
            SET
                finish_date = ($1)
            WHERE id = $2
        `, [date(Date.now()).iso, id], function (err, results) {
            if (err) throw `Database Error! ${err}`

            callback()
        })
    }
}