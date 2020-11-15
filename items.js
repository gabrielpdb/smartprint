const fs = require('fs')
const data = require('./data.json')

//show
exports.show = function (req, res) {
    const { id } = req.params

    const foundItem = data.items.find(function (item) {
        return item.id == id
    })

    if (!foundItem) return res.send('Item not found!')

    const item = {
        ...foundItem,
        created_at: new Intl.DateTimeFormat('pt-BR').format(foundItem.created_at)
    }

    return res.render("items/show", { item: item })

}

//create
exports.post = function (req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "") {
            return res.send('Please, fill all fields!')
        }
    }

    const { description } = req.body

    const created_at = Date.now()
    const id = Number(data.items.length + 1)

    data.items.push({
        id,
        description,
        created_at
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send("Write file error!")

        return res.redirect('/items')
    })
}

//edit
exports.edit = function (req, res) {
    // req.params
    const { id } = req.params

    const foundItem = data.items.find(function (item) {
        return item.id == id
    })

    if (!foundItem) return res.send('Item not found!')

    const item = {
        ...foundItem,
    }

    return res.render('items/edit', { item })
}

//put
exports.put = function (req, res) {
    const { id } = req.body
    let index = 0

    const foundItem = data.items.find(function (item, foundIndex) {
        if (id == item.id) {
            index = foundIndex
            return true
        }
    })

    if (!foundItem) return res.send('Instructor not found!')

    const item = {
        ...foundItem,
        ...req.body,
    }

    data.items[index] = item

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send("Write Error!")

        return res.redirect(`/items/${id}`)
    })
}

//delete
exports.delete = function (req, res) {
    const { id } = req.body

    const filteredItems = data.items.filter(function (item) {
        return item.id != id
    })

    data.items = filteredItems

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send('Write file error!')

        return res.redirect('/items')
    })
}