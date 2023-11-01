const axios = require('axios')
//const server = require('../index')

const URL = 'https://rickandmortyapi.com/api/character/'

const getCharById = async (req, res) => {

    const { id } = req.params

    try {
        const { data } = await axios.get(`${URL}${id}`)
        if (data) {
            const character = {
                id: data.id,
                name: data.name,
                species: data.species,
                origin: data.origin.name,
                image: data.image,
                status: data.status,
                gender: data.gender
            }
            res.status(200).json(character)
        } else {
            res.status(404).json({ Error: 'Not found' })
        }


    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    // con promesas
    //const getCharById = (req, res) => {    
    //const { id } = req.params
    // axios.get(`${URL}${id}`)
    //     .then((response) => {
    //         if (response.data) {
    //             const character = response.data
    //             return {
    //                 id: character.id,
    //                 name: character.name,
    //                 species: character.species,
    //                 origin: character.origin.name,
    //                 image: character.image,
    //                 status: character.status,
    //                 gender: character.gender
    //             }
    //         }
    //     })
    //     .then((response) => {
    //         if (!response.id) {
    //             res.status(404).json({Error:'Not found'})
    //         } else {
    //             res.status(200).json(response);
    //         }
    //     })
    //     .catch((reason) => {

    //         res.status(500).json({error:reason.message});
    //     })
}

module.exports = {getCharById}