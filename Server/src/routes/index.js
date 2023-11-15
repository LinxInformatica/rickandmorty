const {Router} = require('express')
const {getCharById} = require("../controllers/getCharById")
const {login} = require("../controllers/login")
const { postFav } = require('../controllers/postFav')
const { postUser } = require('../controllers/postUser')
const {deleteFav}= require("../controllers/deleteFav")
const { getFavs } = require('../controllers/getFavs')
const { getFavsByUser } = require('../controllers/getFavsByUser')
const { getUsers } = require('../controllers/getUsers')

const router=Router()

router.get('/character/:id', getCharById)

router.get('/login', login)
router.post('/login',postUser)

router.get('/users', getUsers)

router.get('/fav/:userId', getFavsByUser)
//router.get('/fav', getFavs)
router.post('/fav', postFav)
router.delete('/fav', deleteFav)

module.exports = router

