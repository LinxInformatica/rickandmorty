const axios = require('axios')
//const server = require('../index')

const URL = 'https://rickandmortyapi.com/api/character/'

const getCharById = (req, res) => {
    
    const { id } = req.params

    axios.get(`${URL}${id}`)
        .then((response) => {
            if (response.data) {
                const character = response.data
                return {
                    id: character.id,
                    name: character.name,
                    species: character.species,
                    origin: character.origin.name,
                    image: character.image,
                    status: character.status,
                    gender: character.gender
                }
            }
        })
        .then((response) => {
            if (!response.id) {
                res.status(404).json({Error:'Not found'})
            } else {
                res.status(200).json(response);
            }
        })
        .catch((reason) => {
            //reason.rsponse.
            res.status(500).json({error:reason.message});
        })
}

module.exports=getCharById