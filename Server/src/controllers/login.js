const {User}=require('../DB_connection')

async function login(req,res){
    const {email,password}=req.query
    if (!email || !password) {
        res.status(400).json({ error: 'Faltan Datos' })
    } else {
        try {
           const user=await User.findOne(
            {where:{email:email}}
           ) 
           if(!user) return res.status(404).json({access:false,message:"Usuario no encontrado"})
           
           if(user.password!==password) return res.status(403).json({access:false,message:"Contraseña Incorrecta"})
           
            return res.status(200).json({access:true})
          

        } catch (error) {
            res.status(500).json({error:error.message})
        }

    }
}

module.exports={login}



// const users = require('../utils/users')

// const login = (req, res) => {
//     const { email, password } = req.query
//     const user = users.find((u) => u.email === email && u.password === password)
//     if (!user) {
//         res.status(200).json({ access: false })
//     } else {
//         res.status(200).json({ access: true })
//     }
    
// }
// module.exports = {login}