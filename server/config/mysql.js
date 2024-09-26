const { Sequelize } = require('sequelize');

// Importa o sequelize

let sequelize; // Utilizada para guardar a instância do sequelize

async function initializeDatabase() { // Define uma função assíncrona que vai iniciar e configurar o banco de dados
  const sequelizeRaw = new Sequelize('mysql://root:INSIRA-AQUI@localhost:3306', { 
    // Cria uma instância inicial
    logging: false,
  });

  try {
    await sequelizeRaw.authenticate(); // Tenta fazer a conexão inicial com o banco de dados
    console.log('Connection has been established successfully.');
    await sequelizeRaw.query('CREATE DATABASE IF NOT EXISTS sudoku'); // Usa a conexão inicial e cria o banco de dados se não existir
    console.log('Database checked/created successfully.');

    sequelize = new Sequelize('sudoku', 'root', 'INSIRA-AQUI', { // Cria a instância principal
      host: 'localhost',
      dialect: 'mysql',
      logging: false,
    });

    await sequelize.authenticate(); // Verifica a conexão com o sudoku
    console.log('Connection to database established successfully.');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
    throw err;
  }
}

function getSequelize() { // Retorna a instância do sequelize
  if (!sequelize) {
    throw new Error('Database not initialized. Please call initializeDatabase() first.');
  }
  return sequelize;
}

module.exports = { // As funções são exportadas como parte do módulo
  initializeDatabase,
  getSequelize,
};
