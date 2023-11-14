const { Favorite } = require('../DB_connection')

async function getFavs(req, res) {
    try {
        const favorites = await Favorite.findAll()
        res.status(200).json(favorites)

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}

module.exports = { getFavs }