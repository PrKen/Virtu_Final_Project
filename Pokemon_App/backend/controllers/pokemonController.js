const db = require('../models/pokemon');

// Contrôleur pour récupérer tous les Pokémon
exports.getAllPokemon = async (req, res) => {
  try {
    const [rows] = await db.findAll();

    // Log des résultats récupérés
    console.log('Fetched Pokémon:', rows);

    res.status(200).json(rows || []);
  } catch (error) {
    console.error('Error fetching Pokémon:', error);
    res.status(500).json({ error: 'Internal Server Error: Unable to fetch Pokémon.' });
  }
};

// Contrôleur pour ajouter un Pokémon
exports.addPokemon = async (req, res) => {
  try {
    const { name, type, hp, attack, defense } = req.body;

    // Validate required fields
    if (!name || !type || typeof hp !== 'number' || typeof attack !== 'number' || typeof defense !== 'number') {
      return res.status(400).json({ error: 'Invalid Pokémon data. Check the input fields.' });
    }

    const result = await db.add({ name, type, hp, attack, defense });
    res.status(201).json({ message: 'Pokemon added successfully.', id: result.insertId });
  } catch (error) {
    console.error('Error adding Pokemon:', error);
    res.status(500).json({ error: 'Internal Server Error: Unable to add Pokemon.' });
  }
};


// Contrôleur pour supprimer un Pokémon
exports.deletePokemon = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: "Bad Request: Invalid Pokémon ID." });
    }

    await db.remove(id);
    res.status(204).send(); // Réponse 204 pour indiquer que la ressource a été supprimée avec succès
  } catch (error) {
    console.error("Error deleting Pokémon:", error);
    res.status(500).json({ error: "Internal Server Error: Unable to delete Pokémon." });
  }
};
