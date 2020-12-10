const db = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {
    getAllPacks(callback) {
        db.query(`
        SELECT * 
        FROM packs
        ORDER BY start_date DESC
        `, function (err, results) {
            if (err) throw `Database Error! ${err}`

            callback(results.rows)
        })
    },
    createPack(data, callback) {
        const query = `
            INSERT INTO packs (
                description,
                status,
                start_date
            ) VALUES ($1, $2, $3)
            RETURNING id
        `
        const values = [
            data.description,
            "Criado",
            date(Date.now()).iso
        ]

        db.query(query, values, function (err, results) {
            if (err) throw `Database Error! ${err}`

            callback(results.rows[0])
        })

    },
    createPackAA(description) {
        const query = `
            INSERT INTO packs (
                description,
                status,
                start_date
            ) VALUES ($1, $2, $3)
            RETURNING id
        `
        const values = [
            description,
            "Criado",
            date(Date.now()).iso
        ]

        return db.query(query, values)

    },
    findPack(id, callback) {
        db.query(`
            SELECT *
            FROM packs
            WHERE id = $1
        `, [id], function (err, results) {
            if (err) throw `Database Error! ${err}`

            callback(results.rows[0])
        })
    },
    findItemsOfPack(id, callback) {
        db.query(`
            SELECT pack_items.id, items.id AS item_id, items.description, pack_items.quantity 
            FROM items
            JOIN pack_items ON items.id = pack_items.item_id
            WHERE pack_items.pack_id = $1
        `, [id], function (err, results) {
            if (err) throw `Database Error! ${err}`

            callback(results.rows)
        })
    },
    findItemsOfPackAA(id) {
        return db.query(`
            SELECT pack_items.id, items.id AS item_id, items.description, pack_items.quantity 
            FROM items
            JOIN pack_items ON items.id = pack_items.item_id
            WHERE pack_items.pack_id = $1
        `, [id])
    },
    findItemOfPack(id, callback) {
        db.query(`
            SELECT pack_items.*, items.description
            FROM pack_items
            JOIN items ON pack_items.item_id = items.id
            WHERE pack_items.id = $1
        `, [id], function (err, results) {
            if (err) throw `Database Error! ${err}`

            callback(results.rows[0])
        })
    },
    updatePack(data, callback) {
        const query = `
            UPDATE packs 
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
    deletePack(id, callback) {
        db.query(`
        DELETE FROM packs WHERE id = $1
        `, [id], function (err, results) {
            if (err) throw `Database Error! ${err}`

            return callback()
        })
    },
    deleteAllItemsOfPack(pack_id, callback) {
        db.query(`
        DELETE FROM pack_items WHERE pack_id = $1;
        `, [pack_id], function (err, results) {
            if (err) throw `Database Error! ${err}`

            return callback()
        })
    },
    getAllItems(callback) {
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
    createItemOfPack(data, callback) {
        const query = `
            INSERT INTO pack_items (
                quantity,
                item_id,
                pack_id
            ) VALUES ($1, $2, $3)
        `
        const values = [
            data.quantity,
            data.item_id,
            data.pack_id
        ]

        db.query(query, values, function (err, results) {
            if (err) throw `Database Error! ${err}`

            callback()
        })
    },
    createItemOfPackAA(data) {
        const query = `
            INSERT INTO pack_items (
                quantity,
                item_id,
                pack_id
            ) VALUES ($1, $2, $3)
        `
        const values = [
            data.quantity,
            data.item_id,
            data.pack_id
        ]

        return db.query(query, values)
    },
    updateItemOfPack(data, callback) {
        const query = `
            UPDATE pack_items
            SET
                quantity = ($1),
                item_id = ($2)
            WHERE id = $3
            RETURNING pack_id
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
    deleteItemOfPack(id, callback) {
        db.query(`
            DELETE FROM pack_items
            WHERE id = $1
            RETURNING pack_id
        `, [id], function (err, results) {
            if (err) throw `Database Error! ${err}`

            callback(results.rows[0])
        })
    },
    updateStatusOfPack(status, id, callback) {
        db.query(`
            UPDATE packs
            SET
                status = ($1)
            WHERE id = $2
        `, [status, id], function (err, results) {
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
    },
    getPacksInProduction() {
        return db.query(`
            SELECT *
            FROM packs
            WHERE status LIKE('Em produção')
        `, )
    }
}