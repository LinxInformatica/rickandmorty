const { Favorite ,User,user_favorite} = require('../DB_connection')

async function getFavsByUser(req, res) {
    const { userId } = req.params
    try {
        const favorites = await Favorite.findAll({
            include: [{
                model: User,
                through: {
                    model: user_favorite,
                    where: { userId: userId }
                },
                attributes: ['id']
            }],
            where: {
                '$userId$': userId
            }
        })
        res.status(200).json(favorites)

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}

module.exports = { getFavsByUser }