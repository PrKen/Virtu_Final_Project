const mysql = require('mysql2/promise');
const connection = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'password',
  database: process.env.MYSQL_DATABASE || 'pokemon_db',
});

exports.findAll = () => connection.query('SELECT * FROM pokemon');

exports.add = ({ name, type, hp, attack, defense }) =>
  connection.query('INSERT INTO pokemon (name, type, hp, attack, defense) VALUES (?, ?, ?, ?, ?)', [
    name,
    type,
    hp,
    attack,
    defense,
  ]);

exports.remove = (id) => connection.query('DELETE FROM pokemon WHERE id = ?', [id]);