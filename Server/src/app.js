const express = require('express');
const server = express();

const routes = require('../src/routes/index')
const morgan = require('morgan')
server.use(morgan('dev'))

server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, DELETE'
    );
    next();
});
server.use(express.json())
server.use('/rickandmorty', routes)



//server.get('/' ,(req,res)=>{res.status(299).json({a:'pp'})})



module.exports =  server 