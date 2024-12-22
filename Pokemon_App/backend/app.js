const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan'); // Import de Morgan
const pokemonRoutes = require('./routes/pokemonRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware pour journaliser les requêtes
app.use(morgan('dev')); // Niveau de log : dev (affiche les requêtes avec méthode, URL, et temps d'exécution)

app.use(bodyParser.json());
app.use('/api/pokemon', pokemonRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
