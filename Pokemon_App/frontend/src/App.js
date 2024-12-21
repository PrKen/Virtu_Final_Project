import React, { useState, useEffect, useCallback } from "react";
import api from "./services/api";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [filters, setFilters] = useState({ name: "", type1: "" });
  const fields = [
    { name: "dexnum", placeholder: "Dex Number" },
    { name: "name", placeholder: "Name" },
    { name: "generation", placeholder: "Generation" },
    { name: "type1", placeholder: "Primary Type" },
    { name: "type2", placeholder: "Secondary Type" },
    { name: "ability1", placeholder: "Ability 1" },
    { name: "ability2", placeholder: "Ability 2" },
    { name: "ability3", placeholder: "Ability 3" },
    { name: "total", placeholder: "Total Stats" },
    { name: "hp", placeholder: "HP" },
    { name: "atk", placeholder: "Attack" },
    { name: "def", placeholder: "Defense" },
    { name: "sp_atk", placeholder: "Special Attack" },
    { name: "sp_def", placeholder: "Special Defense" },
    { name: "spe", placeholder: "Speed" },
  ];
  const [newPokemon, setNewPokemon] = useState({
      dexnum: "",
      name: "",
      generation: "",
      type1: "",
      type2: "",
      ability1: "",
      ability2: "",
      ability3: "",
      total: "",
      hp: "",
      atk: "",
      def: "",
      sp_atk: "",
      sp_def: "",
      spe: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const containerStyle = {
    margin: "0 auto",
    maxWidth: "800px",
    padding: "20px",
  };
  

  // Fonction pour récupérer les Pokémon avec filtres
  const fetchPokemons = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/pokemons", { params: filters });
      setPokemons(response.data);
    } catch (err) {
      setError("Failed to fetch Pokémon. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchPokemons();
  }, [fetchPokemons]);

  // Fonction pour créer un nouveau Pokémon
  const handleCreatePokemon = async () => {
    try {
      await api.post("/pokemons", newPokemon);
      alert("Pokemon added!");
      fetchPokemons();
    } catch (err) {
      alert(
        err.response?.data?.detail || "Failed to add Pokémon. Please try again."
      );
    }
  };
  

  // Fonction pour supprimer des Pokémon selon les filtres
  const handleDeletePokemons = async () => {
    try {
      await api.delete("/pokemons", { params: filters });
      alert("Pokemon(s) deleted!");
      fetchPokemons();
    } catch (err) {
      alert("Failed to delete Pokémon. Please try again.");
    }
  };

  // Gestion des changements dans les filtres
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Gestion des changements dans les champs de création
  const handleNewPokemonChange = (e) => {
    const { name, value } = e.target;
    setNewPokemon((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1 style={{ color: "#4CAF50" }}>Pokémon App</h1>

      {/* Section de filtres */}
      <div style={{ marginBottom: "20px" }}>
        <h2>Filters</h2>
        <input
          type="text"
          name="name"
          placeholder="Search by name"
          value={filters.name}
          onChange={handleFilterChange}
          style={{
            padding: "10px",
            marginRight: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <input
          type="text"
          name="type1"
          placeholder="Search by type"
          value={filters.type1}
          onChange={handleFilterChange}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <button
          onClick={fetchPokemons}
          style={{
            padding: "10px 20px",
            marginLeft: "10px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
        <button
          onClick={handleDeletePokemons}
          style={{
            padding: "10px 20px",
            marginLeft: "10px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Delete
        </button>
      </div>

      {/* Section d'ajout */}
      <div style={{ marginBottom: "20px" }}>
        <h2>Add Pokemon</h2>
        {fields.map(({ name, placeholder }) => (
          <input
            key={name}
            name={name}
            placeholder={placeholder}
            value={newPokemon[name]}
            onChange={handleNewPokemonChange}
            style={{
              padding: "10px",
              marginRight: "10px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              display: "block",
            }}
          />
        ))}
        <button
          onClick={handleCreatePokemon}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add Pokemon
        </button>
      </div>

      {/* Indicateurs de chargement et d'erreur */}
      {loading && <p>Loading Pokémon...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Liste des Pokémon */}
      <h2>Pokémon List</h2>
      <ul style={{ listStyleType: "none", padding: "0" }}>
        {pokemons.map((pokemon) => (
          <li
            key={pokemon.dexnum}
            style={{
              padding: "10px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          >
            <strong>{pokemon.name}</strong> - Type: {pokemon.type1}{" "}
            {pokemon.type2 ? `/ ${pokemon.type2}` : ""}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
