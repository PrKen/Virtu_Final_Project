import React, { useState } from 'react';
import axios from 'axios';

const AddPokemon = () => {
  const [pokemon, setPokemon] = useState({
    name: '',
    type: '',
    hp: '',
    attack: '',
    defense: '',
  });

  const handleChange = (e) => {
    setPokemon({
      ...pokemon,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/pokemon', {
        name: pokemon.name,
        type: pokemon.type,
        hp: Number(pokemon.hp),
        attack: Number(pokemon.attack),
        defense: Number(pokemon.defense),
      });
      console.log('Pokemon added:', response.data);
    } catch (error) {
      console.error('Error adding Pokemon:', error.response?.data || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={pokemon.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="type"
        placeholder="Type"
        value={pokemon.type}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="hp"
        placeholder="HP"
        value={pokemon.hp}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="attack"
        placeholder="Attack"
        value={pokemon.attack}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="defense"
        placeholder="Defense"
        value={pokemon.defense}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Pokemon</button>
    </form>
  );
};

export default AddPokemon;
