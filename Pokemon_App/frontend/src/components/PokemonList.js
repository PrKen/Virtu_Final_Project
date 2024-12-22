import React, { useEffect, useState } from 'react';

const PokemonList = () => {
  const [pokemon, setPokemon] = useState([]);
  const [error, setError] = useState(null);

  // Récupère tous les Pokémon au chargement
  useEffect(() => {
    fetch('/api/pokemon')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(setPokemon)
      .catch((error) => {
        console.error("Error fetching Pokémon:", error);
        setError("Failed to fetch Pokémon data. Please try again later.");
      });
  }, []);

  // Supprime un Pokémon par son ID
  const deletePokemon = async (id) => {
    try {
      const res = await fetch(`/api/pokemon/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      // Supprime le Pokémon localement après la suppression sur le backend
      setPokemon(pokemon.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting Pokémon:", error);
      setError("Failed to delete Pokémon. Please try again later.");
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Pokemon List</h1>
      <ul>
        {pokemon.map((p) => (
          <li key={p.id}>
            {p.name} ({p.type}) - HP: {p.hp}, Attack: {p.attack}, Defense: {p.defense}
            <button onClick={() => deletePokemon(p.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonList;
