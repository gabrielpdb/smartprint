module.exports = {
    date(timestamp) {
        const date = new Date(timestamp)

        const hour = `0${date.getHours()}`.slice(-2)
        const minutes = `0${date.getMinutes()}`.slice(-2)
        const seconds = `0${date.getSeconds()}`.slice(-2)

        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`,
            birthDay: `${day}/${month}`,
            format: `${day}/${month}/${year} ${hour}:${minutes}:${seconds}`
        }
    }
}