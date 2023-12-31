const { Favorite, User, user_favorite } = require('../DB_connection')

async function deleteFav(req, res) {
    const { id, userId } = req.query
    if (!id || !userId) {
        return res.status(401).json({ error: "Faltan Datos" })
    }
    try {
        await user_favorite.destroy({
            where: {
                userId: userId,
                favoriteId: id
            }
        })

        const favorites = await Favorite.findAll({
            include: [{
                model: User,
                through: {
                    model: user_favorite,
                    where: { userId: userId }
                },
                attributes: []
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

module.exports = { deleteFav }