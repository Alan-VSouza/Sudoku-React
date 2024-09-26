const express = require('express');
const cors = require('cors');
const { initializeDatabase, getSequelize } = require('./config/mysql');
const { initializeUserModel } = require('./models/User');
require('dotenv').config();


const authRoutes = require('./routes/auth');
const sudokuRoutes = require('./routes/sudoku');

// Importações necessárias

const app = express(); // Importa o framework Express.

app.use(cors());
app.use(express.json());

initializeDatabase() // Inicializa a conexão com o banco de dados.
  .then(() => {
    console.log('Database initialized successfully.');

    initializeUserModel(); // Inicializa o modelo User após a inicialização do banco de dados

    // Sincroniza os modelos com o banco de dados
    const sequelize = getSequelize();
    return sequelize.sync();
  })
  .then(() => {
    console.log('Models synchronized successfully.');

    app.use('/api/auth', authRoutes);
    app.use('/api/sudoku', sudokuRoutes);

    app.get('/', (req, res) => {
      res.send('API is running...');
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('Failed to initialize database:', err);
    process.exit(1); // Encerra o processo se a inicialização do banco de dados falhar
  });
