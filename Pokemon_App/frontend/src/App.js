import React from 'react';
import PokemonList from './components/PokemonList';
import AddPokemon from './components/AddPokemon';

const App = () => (
  <div>
    <h1>Pokemon Manager</h1>
    <AddPokemon />
    <PokemonList />
  </div>
);

export default App;