const server = require('./app')
const PORT = 3001;
const { conn } = require('./DB_connection')

conn
    .sync({})
    .then(()=>{
        server.listen(PORT, () => {
            console.log('Server raised in port: ' + PORT);
        
        });
    })
    .catch((error)=>{
        console.log(error)
    })


