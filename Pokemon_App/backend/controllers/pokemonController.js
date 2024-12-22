const db = require('../models/pokemon');

exports.getAllPokemon = async (req, res) => {
  try {
    const [rows] = await db.findAll();
    res.json(rows || []); // Toujours retourner un tableau JSON
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.addPokemon = async (req, res) => {
  try {
    const { name, type, hp, attack, defense } = req.body;
    const result = await db.add({ name, type, hp, attack, defense });
    res.status(201).json(result);
  } catch (error) {
    console.error("Error adding Pokémon:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deletePokemon = async (req, res) => {
  try {
    const { id } = req.params;
    await db.remove(id);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting Pokémon:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};