const db = require('../../config/db')

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
    }
}