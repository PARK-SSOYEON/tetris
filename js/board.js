import {drawBlock} from "./utils.js";

// 블록의 크기
export const COLS = 12;
export const ROWS = 21;
export const BLOCK_SIZE = 30;

// 그리드를 그리는 함수
export function drawGrid(context, canvas) {
  context.strokeStyle = '#444';

  // 수직선 그리기
  for (let col = 0; col < COLS; col++) {
    context.beginPath();
    context.moveTo(col * BLOCK_SIZE, 0);
    context.lineTo(col * BLOCK_SIZE, canvas.height);
    context.stroke();
  }

  // 수평선 그리기
  for (let row = 0; row < ROWS; row++) {
    context.beginPath();
    context.moveTo(0, row * BLOCK_SIZE);
    context.lineTo(canvas.width, row * BLOCK_SIZE);
    context.stroke();
  }
}

// 게임 보드를 초기화하는 함수
export function createBoard() {
  const board = [];
  for (let row = 0; row < ROWS; row++) {
    board[row] = [];
    for (let col = 0; col < COLS; col++) {
      if (col === 0 || col === COLS - 1 || row === ROWS - 1) {
        board[row][col] = { value: 1, color: 'gray'}; // 벽은 1로 표시
      } else {
        board[row][col] = { value: 0, color: 'black' } // 빈 공간은 0으로 표시
      }
    }
  }
  return board;
}

// 게임 보드를 그리는 함수
export function drawBoard(context, board) {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const cell = board[row][col];
      drawBlock(context, col, row, cell.color);
    }
  }
}
