const db = require('../../config/db')
const {} = require('../../lib/utils')

module.exports = {
    all(callback) {
        db.query(`
            SELECT stock.*, items.description 
            FROM stock
            JOIN items ON stock.item_id = items.id
            ORDER BY items.description ASC
        `, function (err, results) {
            if (err) throw `Database Error! ${err}`

            callback(results.rows)
        })
    },
    find(id, callback) {
        db.query(`
            SELECT stock.*, items.description
            FROM stock
            JOIN items ON items.id = stock.item_id
            WHERE stock.id = $1
        `, [id], function (err, results) {
            if (err) throw `Database Error! ${err}`

            callback(results.rows[0])
        })
    },
    findItemByItemId(id) {
        return db.query(`
            SELECT *
            FROM stock
            WHERE item_id = $1
        `, [id])
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

        console.log(data)

        db.query(query, values, function (err, results) {
            if (err) throw `Database Error! ${err}`

            callback()
        })
    }
}