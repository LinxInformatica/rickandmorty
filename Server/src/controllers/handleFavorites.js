var myFavorites = []

const postFav = (req, res) => {
    myFavorites.push(req.body)
    res.status(200).json(myFavorites)

}

const deleteFav = (req, res) => {
    const { id } = req.params
    if (id === 999) {
        myFavorites = []
    } else {
        myFavorites = myFavorites.filter((fav) => fav.id !== Number(id))
    }
    res.status(200).json(myFavorites)
}

module.exports = { postFav, deleteFav }