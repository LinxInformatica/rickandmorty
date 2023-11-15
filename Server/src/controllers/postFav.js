const { Favorite, user_favorite ,User} = require('../DB_connection')

async function postFav(req, res) {
    const { id, name, origin, status, image, species, gender, userId } = req.body
    if (!id || !name || !origin || !status || !image || !species || !gender || !userId) {
        return res.status(401).json({ error: "Faltan Datos" })
    }
    try {
        await Favorite.findOrCreate({
            where: { id: id },
            defaults: {
                name: name,
                origin: origin,
                status: status,
                image: image,
                species: species,
                gender: gender
            }
        })

        await user_favorite.findOrCreate({
            where: {
                favoriteId: id,
                userId: userId
            },

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

module.exports = { postFav }