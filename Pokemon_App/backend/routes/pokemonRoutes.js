const express = require('express');
const router = express.Router();
const { getAllPokemon, addPokemon, deletePokemon } = require('../controllers/pokemonController');

router.get('/', getAllPokemon);
router.post('/', addPokemon);
router.delete('/:id', deletePokemon);

module.exports = router;