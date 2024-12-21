import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [newPokemon, setNewPokemon] = useState({ name: '', type: '', level: 1 });

  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = async () => {
    const response = await axios.get('http://localhost:4000/pokemons');
    setPokemons(response.data);
  };

  const addPokemon = async () => {
    await axios.post('http://localhost:4000/pokemons', newPokemon);
    fetchPokemons();
  };

  return (
    <div>
      <h1>Pokemon App</h1>
      <div>
        <input
          placeholder="Name"
          value={newPokemon.name}
          onChange={(e) => setNewPokemon({ ...newPokemon, name: e.target.value })}
        />
        <input
          placeholder="Type"
          value={newPokemon.type}
          onChange={(e) => setNewPokemon({ ...newPokemon, type: e.target.value })}
        />
        <input
          type="number"
          placeholder="Level"
          value={newPokemon.level}
          onChange={(e) => setNewPokemon({ ...newPokemon, level: e.target.value })}
        />
        <button onClick={addPokemon}>Add Pokemon</button>
      </div>
      <ul>
        {pokemons.map((pokemon) => (
          <li key={pokemon._id}>
            {pokemon.name} ({pokemon.type}) - Level {pokemon.level}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
