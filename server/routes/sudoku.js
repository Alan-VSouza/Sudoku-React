const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const sudokuBoards = require('../utils/sudokuBoards');

// Importações necessárias

const router = express.Router(); // Cria uma instância do roteador do Express para definir rotas de maneira modular

router.get('/puzzle', authMiddleware, (req, res) => { // Define a rota puzzle para poder obter um tabuleiro aleatório do sudoku
  const randomIndex = Math.floor(Math.random() * sudokuBoards.length); // Gera um indice aleatório para poder selecionar um tabuleiro de sudoku
  const board = sudokuBoards[randomIndex]; // Seleciona o tabuleiro de acordo com o indice gerado
  res.json({ board });
});

router.post('/validate', authMiddleware, (req, res) => { // Define a rota validate para poder validar o tabuleiro sudoku enviado
  const { board } = req.body; // Extrai o tabuleiro do corpo da requisição
  const invalidCells = getInvalidCells(board); //  Chama a função getInvalidCells para obter as células inválidas no tabuleiro
  if (invalidCells.length === 0) {
    res.json({ valid: true });
  } else {
    res.json({ valid: false, invalidCells });
  }
});

module.exports = router;
