import React, { useEffect, useState } from 'react';
import './PokemonList.css';

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
        console.error('Error fetching Pokémon:', error);
        setError('Failed to fetch Pokémon data. Please try again later.');
      });
  }, []);

  const deletePokemon = async (id) => {
    try {
      const res = await fetch(`/api/pokemon/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      setPokemon(pokemon.filter((p) => p.id !== id));
    } catch (error) {
      console.error('Error deleting Pokémon:', error);
      setError('Failed to delete Pokémon. Please try again later.');
    }
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="pokemon-list">
      <h2>Pokémon List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>HP</th>
            <th>Attack</th>
            <th>Defense</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pokemon.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.type}</td>
              <td>{p.hp}</td>
              <td>{p.attack}</td>
              <td>{p.defense}</td>
              <td>
                <button className="btn-delete" onClick={() => deletePokemon(p.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PokemonList;
