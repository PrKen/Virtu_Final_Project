import React, { useEffect, useState } from 'react';

const PokemonList = () => {
  const [pokemon, setPokemon] = useState([]);
  const [error, setError] = useState(null);

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

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <ul>
      {pokemon.map((p) => (
        <li key={p.id}>
          {p.name} ({p.type}) - HP: {p.hp}, Attack: {p.attack}, Defense: {p.defense}
        </li>
      ))}
    </ul>
  );
};

export default PokemonList;