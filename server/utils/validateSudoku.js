const isValidInRow = (board, row, num, excludeCol) => {
  for (let col = 0; col < 9; col++) {
    if (col !== excludeCol && board[row][col] === num) return false;
  }
  return true;
};

const isValidInCol = (board, col, num, excludeRow) => {
  for (let row = 0; row < 9; row++) {
    if (row !== excludeRow && board[row][col] === num) return false;
  }
  return true;
};

const isValidInBox = (board, startRow, startCol, num, excludeRow, excludeCol) => {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const currentRow = row + startRow;
      const currentCol = col + startCol;
      if ((currentRow !== excludeRow || currentCol !== excludeCol) && board[currentRow][currentCol] === num) return false;
    }
  }
  return true;
};

const isValidMove = (board, row, col, num) => {
  if (num === 0) return false;
  const validRow = isValidInRow(board, row, num, col);
  const validCol = isValidInCol(board, col, num, row);
  const validBox = isValidInBox(board, row - (row % 3), col - (col % 3), num, row, col);
  
  if (!validRow || !validCol || !validBox) {
    console.log(`Invalid move at row ${row}, col ${col} with num ${num}`);
  }

  return validRow && validCol && validBox;
};

const getInvalidCells = (board) => {
  const invalidCells = [];
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const num = board[row][col];
      if (num === 0 || !isValidMove(board, row, col, num)) {
        invalidCells.push([row, col]);
      }
    }
  }
  return invalidCells;
};

const isBoardValid = (board) => {
  return getInvalidCells(board).length === 0;
};

module.exports = { isBoardValid, isValidMove, getInvalidCells };
