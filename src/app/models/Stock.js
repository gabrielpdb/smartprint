const db = require('../../config/db')
const {} = require('../../lib/utils')

module.exports = {
    all(callback) {
        db.query(`
            SELECT stock.*, items.description 
            FROM stock
            JOIN items ON stock.item_id = items.id
        `, function (err, results) {
            if (err) throw `Database Error! ${err}`

            callback(results.rows)
        })
    },
    find(id, callback) {
        db.query(`
            SELECT *
            FROM stock
            WHERE id = $1
        `, [id], function (err, results) {
            if (err) throw `Database Error! ${err}`

            callback(results.rows[0])
        })
    },
    update(data, callback) {
        const query = `
            UPDATE stock 
            SET
                quantity = ($1)
            WHERE id = $2
        `
        const values = [
            data.quantity,
            data.id
        ]

        db.query(query, values, function (err, results) {
            if (err) throw `Database Error! ${err}`

            callback()
        })
    }
}