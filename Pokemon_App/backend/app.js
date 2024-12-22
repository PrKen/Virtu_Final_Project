const express = require('express');
const bodyParser = require('body-parser');
const pokemonRoutes = require('./routes/pokemonRoutes');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use('/api/pokemon', pokemonRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;