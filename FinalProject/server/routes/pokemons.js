var express = require('express');
var router = express.Router();
var sequenceGenerator = require('./sequenceGenerator');

const Pokemon = require('../models/pokemon');
const { response } = require('express');

// var getPokemons = function(res) {
//     Pokemon.find()
//     .exec(function (err, pokemons) {
//         if (err) {
//             return res.status(500).json({
//                 title: 'An error occurred',
//                 error: err
//             });
//         }
//         res.status(200).json({
//             pokemon: 'Success',
//             obj: pokemons
//         });
//     })
// }

// var savePokemon = function (response, contact) {
//     if(pokemon.group && pokemon.group.length > 0) {
//         for (let groupPokemon of pokemon.group) {
//             groupPokemon = groupPokemon._id;
//         }
//     }
//     pokemon.save(function (err, responseult) {
//         response.setHeader('Content-Type', 'application/json');
//         if (err) {
//             return response.status(500).json({
//                 title: 'An error occurred',
//                 error: err
//             });
//         }
//         // getPokemons(response);
//     })
// }

function returnError(res, error) {
    res.status(500).json({
        message: 'An error occured',
        error: error
    });
}

router.get('/', (req, res, next) => {
    Pokemon.find()
    .then(pokemons => {
        res.status(200).json({
            message: 'Pokemons fetched successfully!',
            pokemons: pokemons
        });
    })
    .catch(error => {
        returnError(res, error);
    });
});

router.get('/:id', (req, res, next) => {
    Pokemon.findOne({
        "id": req.params.id
    })
    .then(pokemon => {
        res.status(200).json({
            message: 'Pokemon fetched successfully!',
            pokemon: pokemon
        });
    })
    .catch(error => {
        returnError(res, error);
    });
});

router.post('/', (req, res, next) => {
    const maxPokemonId = sequenceGenerator.nextId("pokemons");

    const pokemon = new Pokemon({
        id: maxPokemonId,
        name: req.body.name,
        nickname: req.body.nickname,
        gender: req.body.gender,
        type: req.body.type,
        game: req.body.game,
        imageUrl: req.body.imageUrl
    });

    pokemon.save()
    .then(createdPokemon => {
        res.status(201).json({
            message: "Pokemon added successfully!",
            pokemon: createdPokemon
        });
    })
    .catch(error => {
        returnError(res, error);
    });
});

router.put('/:id', (req, res, next) => {
    Pokemon.findOne({
        id: req.params.id
    })
    .then(pokemon => {
        pokemon.name = req.body.name;
        pokemon.nickname = req.body.nickname;
        pokemon.gender = req.body.gender;
        pokemon.type = req.body.type;
        pokemon.game = req.body.game;
        pokemon.imageUrl = req.body.imageUrl;

        Pokemon.updateOne({
            id: req.params.id
        }, pokemon)
        .then(result => {
            res.status(204).json({
                message: 'Pokemon updated successfully!'
            })
        })
        .catch(error => {
            returnError(res, error);
        });
    });
});

router.delete("/:id", (req, res, next) => {
    Pokemon.findOne({
        id: req.params.id
    })
    .then(pokemon => {
        Pokemon.deleteOne({
            id: req.params.id
        })
        .then(result => {
            res.status(204).json({
                message: "Pokemon deleted successfully!"
            });
        })
        .catch(error => {
            returnError(res, error);
        })
    })
    .catch(error => {
        returnError(res, error);
    });
});

module.exports = router;