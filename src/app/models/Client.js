const db = require('../../config/db')
const {} = require('../../lib/utils')

module.exports = {
    all(callback) {
        db.query(`
        SELECT *
        FROM clients
        `, function (err, results) {
            if (err) throw `Database Error! ${err}`

            callback(results.rows)
        })
    },
    create(data, callback) {
        const query = `
            INSERT INTO clients (
                name
            ) VALUES ($1)
            RETURNING id
        `
        const values = [
            data.name
        ]

        db.query(query, values, function (err, results) {
            if (err) throw `Database Error! ${err}`

            callback(results.rows[0])
        })

    },
    find(id, callback) {
        db.query(`
            SELECT *
            FROM clients
            WHERE id = $1
        `, [id], function (err, results) {
            if (err) throw `Database Error! ${err}`

            callback(results.rows[0])
        })
    },
    update(data, callback) {
        const query = `
            UPDATE clients 
            SET
                name = ($1)
            WHERE id = $2
        `
        const values = [
            data.name,
            data.id
        ]

        db.query(query, values, function (err, results) {
            if (err) throw `Database Error! ${err}`

            callback()
        })
    },
    delete(id, callback) {
        db.query(`DELETE FROM clients WHERE id = $1`, [id], function (err, results) {
            if (err) throw `Database Error! ${err}`

            return callback()
        })
    }
}