const users = require('../utils/users')

const login = (req, res) => {
    const { email, password } = req.query
    const user = users.find((u) => u.email === email && u.password === password)
    if (!user) {
        res.status(200).json({ access: false })
    } else {
        res.status(200).json({ access: true })
    }
    
}
module.exports = login