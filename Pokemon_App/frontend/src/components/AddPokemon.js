import React, { useState } from 'react';

const AddPokemon = () => {
  const [form, setForm] = useState({ name: '', type: '', hp: '', attack: '', defense: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/pokemon', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="type" placeholder="Type" onChange={handleChange} />
      <input name="hp" placeholder="HP" onChange={handleChange} />
      <input name="attack" placeholder="Attack" onChange={handleChange} />
      <input name="defense" placeholder="Defense" onChange={handleChange} />
      <button type="submit">Add Pokemon</button>
    </form>
  );
};

export default AddPokemon;