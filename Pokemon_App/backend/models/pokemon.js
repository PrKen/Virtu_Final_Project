require('dotenv').config(); // Charger les variables d'environnement depuis .env
const mysql = require('mysql2/promise');

// Configuration de la connexion MySQL via un pool
const connection = mysql.createPool({
  host: process.env.MYSQL_HOST || 'mysql',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'password',
  database: process.env.MYSQL_DATABASE || 'pokemon_db',
});

// Fonction pour récupérer tous les Pokémon
exports.findAll = () => connection.query('SELECT * FROM pokemon');

// Fonction pour ajouter un Pokémon
exports.add = async ({ name, type, hp, attack, defense }) => {
  console.log('Adding Pokémon:', { name, type, hp, attack, defense });
  return connection.query('INSERT INTO pokemon (name, type, hp, attack, defense) VALUES (?, ?, ?, ?, ?)', [
    name,
    type,
    hp,
    attack,
    defense,
  ]);
};

// Fonction pour supprimer un Pokémon par ID
exports.remove = (id) => connection.query('DELETE FROM pokemon WHERE id = ?', [id]);
