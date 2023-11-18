const { User } = require('../DB_connection')

async function postUser(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Faltan Datos' })
    }
    try {
        const [user, created] = await User.findOrCreate({
            where: { email: email },
            defaults: {
                password: password
            }
        })
        if (created) {
            return res.status(200).json(user)
        } else {
            return res.status(201).json(user)
        }


    } catch (error) {
        return res.status(500).json({ error: error.message })
    }

}


module.exports = { postUser }