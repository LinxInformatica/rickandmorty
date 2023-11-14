const { User } = require('../DB_connection')

async function postUser(req, res) {
    const { email, password } = req.body;
    console.log(email, password)
    if (!email || !password) {
        res.status(400).json({ error: 'Faltan Datos' })
    } else {
        try {
            const [user, created] = await User.findOrCreate({
                where: { email: email },
                defaults: {
                    password: password
                }
            })
            if(created){
                res.status(201).json(user)
            }else{
                res.status(200).json(user)
            }
             

        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
}


module.exports = { postUser }