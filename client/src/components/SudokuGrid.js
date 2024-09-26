import React from 'react';
import './StyleGrid.css';
//Importação dos estilos de react e do css

const SudokuGrid = ({ grid, originalGrid, onCellChange, onCellKeyPress }) => { 
  // Define o grid, recebendo:

  // grid: Estado Atual do tabuleiro
  // originalGrid: Estado original do tabuleiro de 'fabrica', não podendo ser alterado
  // onCellChange: Função de quando uma celula é alterada
  // onCellKeyPress: Função quando a tecla 'enter' é pressionada confirmando a ação

  if (!Array.isArray(grid) || !Array.isArray(originalGrid) || !grid.length || !originalGrid.length) { 
    return <div>Carregando...</div>; // Verifica se não está vazio o estado atual e o original
  }

  const handleFocus = (e) => { // Quando a célula é 'focada' efetua as ações
    const row = e.target.getAttribute('data-row'); 
    const col = e.target.getAttribute('data-col'); 
    document.querySelectorAll(`.sudoku-cell[data-row="${row}"], .sudoku-cell[data-col="${col}"]`).forEach(cell => {
      cell.classList.add('highlight');
    }); // Pega todos os elementos da linha e da coluna e aplicam o css highlight mudando assim a cor de fundo
  };

  const handleBlur = (e) => { // Quando sai da célula
    const row = e.target.getAttribute('data-row'); 
    const col = e.target.getAttribute('data-col'); 
    document.querySelectorAll(`.sudoku-cell[data-row="${row}"], .sudoku-cell[data-col="${col}"]`).forEach(cell => {
      cell.classList.remove('highlight');
    }); // Volta ao estado original
  };

  return ( // Retorna a classe do grid, responsável por renderizar a grade
    <div className="sudoku-grid">
      {grid.map((row, rowIndex) => // Percorre o grid para ver o estado atual do jogo, fazendo sobre cada linha
        row.map((value, colIndex) => ( // Percorre por cada célula da linha atual
          <input
            key={`${rowIndex}-${colIndex}`} // Chave única para cada célula 
            className={`sudoku-cell${originalGrid[rowIndex][colIndex] ? ' original' : ''}${value ? '' : ' invalid'}`} // Define o css, se for vazio fica vermelho (inválido / faltando)
            type="text" // Tipo de dado
            maxLength="1" // Tamanho máximo de 1 caractere
            value={value || ''} // Ou é valor ou é nada
            readOnly={originalGrid[rowIndex][colIndex] !== 0} // Se for célula original não pode ser alterada
            data-row={rowIndex} // Armazena o indíce da linha
            data-col={colIndex} // Armazena o indíce da coluna
            onChange={(e) => onCellChange(e, rowIndex, colIndex)} // Chama as funções de acordo com as ações
            onKeyDown={(e) => onCellKeyPress(e, rowIndex, colIndex)} // Função de acordo com tecla pressionada
            onFocus={handleFocus} // Como agir quando ganhar foco
            onBlur={handleBlur} // Como agir quando perder o foco
          />
        ))
      )}
    </div>
  );
};

export default SudokuGrid;
