const db = require('../../config/db')
const { } = require('../../lib/utils')

module.exports = {
    all(callback) {
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
                height,
                width,
                kit
            ) VALUES ($1, $2, $3, $4)
            RETURNING id
        `
        const values = [
            data.description,
            data.height,
            data.width,
            false
        ]

        db.query(query, values, function (err, results) {
            if (err) throw `Database Error! ${err}`

            callback(results.rows[0])
        })

    },
    createStock(id, callback) {
        const query = `
        INSERT INTO stock (
            item_id,
            quantity
        ) VALUES ($1, $2)
    `
        const values = [
            id,
            0
        ]

        db.query(query, values, function (err, results) {
            if (err) throw `Database Error! ${err}`

            callback()
        })
    },
    find(id, callback) {
        db.query(`
            SELECT *
            FROM items
            WHERE id = $1
        `, [id], function (err, results) {
            if (err) throw `Database Error! ${err}`

            callback(results.rows[0])
        })
    },
    findItemAA(id) {
        return db.query(`
        SELECT *
        FROM items
        WHERE id = $1
        `, [id])
    },
    update(data, callback) {
        const query = `
            UPDATE items 
            SET
                description = ($1),
                height = ($2),
                width = ($3)
            WHERE id = $4
        `
        const values = [
            data.description,
            data.height,
            data.width,
            data.id
        ]

        db.query(query, values, function (err, results) {
            if (err) throw `Database Error! ${err}`

            callback()
        })
    },
    delete(id, callback) {
        db.query(`DELETE FROM items WHERE id = $1`, [id], function (err, results) {
            if (err) throw `Database Error! ${err}`

            return callback()
        })
    },
    deleteStock(id, callback) {
        db.query(`DELETE FROM stock WHERE item_id = $1`, [id], function (err, results) {
            if (err) throw `Database Error! ${err}`

            return callback()
        })
    }
}