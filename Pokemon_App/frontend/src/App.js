import React from 'react';
import PokemonList from './components/PokemonList';
import AddPokemon from './components/AddPokemon';
import './App.css';

const App = () => (
  <div className="app">
    <header>
      <h1>Pokémon Manager</h1>
    </header>
    <main>
      <AddPokemon />
      <PokemonList />
    </main>
  </div>
);

export default App;
