const express = require('express');
const router = express.Router();
const { getAllPokemon, addPokemon, deletePokemon } = require('../controllers/pokemonController');

// Définition des routes
router.get('/', getAllPokemon);    // Route pour récupérer tous les Pokémon
router.post('/', addPokemon);     // Route pour ajouter un Pokémon
router.delete('/:id', deletePokemon); // Route pour supprimer un Pokémon par ID

module.exports = router;
