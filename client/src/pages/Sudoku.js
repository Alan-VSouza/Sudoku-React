import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import SudokuGrid from '../components/SudokuGrid';
import { AuthContext } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';
import './Sudoku.css';

// Importações necessárias para o Sudoku

const Sudoku = () => { // Cria o componente Sudoku
  // Diversos estados para armazenar as diversas coisas
  const [sudoku, setSudoku] = useState([]); 
  const [originalSudoku, setOriginalSudoku] = useState([]); 
  const [invalidCells, setInvalidCells] = useState([]);
  const [differentCells, setDifferentCells] = useState([]);
  const [errorCount, setErrorCount] = useState(0);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false); 
  const { authState, logout } = useContext(AuthContext);
  const history = useHistory();

  const fetchSudoku = () => {
    axios // Requisição do tipo get para o servidor sudoku
      .get('http://localhost:5000/api/sudoku/puzzle', {
        headers: { Authorization: `Bearer ${authState.token}` },
      })
      .then((res) => {
        setSudoku(res.data.board);
        setOriginalSudoku(JSON.parse(JSON.stringify(res.data.board))); 
        setIsComplete(false); 
        setInvalidCells([]);
        setDifferentCells([]);
        setErrorCount(0);
      })
      .catch((error) => {
        console.error(error);
        if (error.response.status === 401) {
          logout();
          history.push('/login');
        }
      });
  };

  useEffect(() => { // Verifica se o usuário está autenticado, se não estiver ele é direcionado para o login
    if (!authState.isAuthenticated) {
      history.push('/login');
    } else {
      fetchSudoku();
    }
  }, [authState, history, logout]);

  const handleCellChange = (e, row, col) => { // Valida se o valor é entre 1 e 9 quando for digitado um valor
    const value = parseInt(e.target.value, 10);
    const newSudoku = [...sudoku];
    if (!isNaN(value) && value >= 1 && value <= 9) {
      newSudoku[row][col] = value;
    } else {
      newSudoku[row][col] = 0; 
    }
    setSudoku(newSudoku);
  };

  const handleCellKeyPress = (e, row, col) => { // Quando a tecla for pressionada ele valida novamente
    if (e.key === 'Enter') {
      const value = parseInt(e.target.value, 10);
      if (!isNaN(value) && value >= 1 && value <= 9) {
        validateSingleCell(sudoku, row, col, value);
        e.target.blur();
      }
    }
  };

  const validateSingleCell = (board, row, col, num) => { // Valida a célula individual 
    const isValid = isValidMove(board, num, row, col);
    if (!isValid) { // Se não for válido
      setInvalidCells((prev) => [...prev, [row, col]]); // Adiciona a lista de células inválidas
      setDifferentCells((prev) => prev.filter(cell => cell[0] !== row || cell[1] !== col)); // Remove a célula da lista de células diferentes (caso esteja presente)
      setErrorCount((prevCount) => prevCount + 1); // Incrementa a contagem de erros
    } else {
      setInvalidCells((prev) => prev.filter(cell => cell[0] !== row || cell[1] !== col)); // Remove a célula da lista de células inválidas (caso esteja presente)
      if (num !== originalSudoku[row][col]) {
        setDifferentCells((prev) => [...prev, [row, col]]); // Se o número atual é diferente do número original, adiciona à lista de células diferentes
      } else { // Se o número é igual ao original, remove da lista de células diferentes
        setDifferentCells((prev) => prev.filter(cell => cell[0] !== row || cell[1] !== col));
      }
       // Se o tabuleiro está completo, atualiza a pontuação e marca como completo
      if (isBoardComplete(board)) {
        setScore((prevScore) => prevScore + 100); 
        setIsComplete(true); 
        alert('Parabéns! Você completou o Sudoku!');
      }
    }
  };

  const isValidMove = (board, num, row, col) => {
    // Verifica na linha se já não existe na linha o número
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === num && col !== i) {
        return false;
      }
    }

    // Verifica na coluna se já não existe na coluna o número
    for (let i = 0; i < 9; i++) {
      if (board[i][col] === num && row !== i) {
        return false;
      }
    }

    // Verifica na caixa 3x3, se o número não é repetido
    const box_x = Math.floor(col / 3);
    const box_y = Math.floor(row / 3);

    for (let i = box_y * 3; i < box_y * 3 + 3; i++) {
      for (let j = box_x * 3; j < box_x * 3 + 3; j++) {
        if (board[i][j] === num && (i !== row || j !== col)) {
          return false;
        }
      }
    }

    return true;
  };
  // Verifica se o tabuleiro já está completo
  const isBoardComplete = (board) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) { // Se algum valor for nulo retorna false
          return false;
        }
      }
    }
    return true;
  };

  useEffect(() => { 
    if (errorCount >= 5) { // Se o número de erros for igual ou maior que 5
      alert('Você perdeu o jogo! Número máximo de erros atingido.'); // Mostra a mensagem na tela
      history.push('/'); // Redireciona para a home
    }
  }, [errorCount, history]);

  useEffect(() => {
    invalidCells.forEach(([row, col]) => {
      const cell = document.querySelector(`.sudoku-cell[data-row='${row}'][data-col='${col}']`);
      if (cell) {
        cell.classList.add('invalid');
        cell.classList.remove('different');
      }
    });

    differentCells.forEach(([row, col]) => {
      const cell = document.querySelector(`.sudoku-cell[data-row='${row}'][data-col='${col}']`);
      if (cell) {
        cell.classList.add('different');
        cell.classList.remove('invalid');
      }
    });
  }, [invalidCells, differentCells]);

  return ( // Renderiza a interface do sudoku, incluindo o grid, contadores de erros e pontuaçoes e botões
    <div className="sudoku-container">
      <h1>Jogo de Sudoku</h1>
      <SudokuGrid 
        grid={sudoku} 
        originalGrid={originalSudoku} 
        onCellChange={handleCellChange} 
        onCellKeyPress={handleCellKeyPress}
      />
      <div className="error-counter">
        Erros: {errorCount}/5
      </div>
      <div className="score-counter">
        Pontuação: {score}
      </div>
      {isComplete && (
        <button onClick={fetchSudoku} className="reset-button">Reiniciar Tabuleiro</button>
      )}
      <button onClick={logout} className="logout-button">Logout</button>
    </div>
  );
};

export default Sudoku;
