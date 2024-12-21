const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://mongo:27017/pokemonDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const PokemonSchema = new mongoose.Schema({
  name: String,
  type: String,
  level: Number,
});

const Pokemon = mongoose.model('Pokemon', PokemonSchema);

// API Endpoints
app.get('/pokemons', async (req, res) => {
  const pokemons = await Pokemon.find();
  res.json(pokemons);
});

app.post('/pokemons', async (req, res) => {
  const newPokemon = new Pokemon(req.body);
  await newPokemon.save();
  res.status(201).json(newPokemon);
});

app.delete('/pokemons/:id', async (req, res) => {
  await Pokemon.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
