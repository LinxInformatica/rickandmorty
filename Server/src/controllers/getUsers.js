const { User } = require('../DB_connection')

async function getUsers(req, res) {
    try {
        const users = await User.findAll()
        res.status(200).json(users)

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}

module.exports = { getUsers }