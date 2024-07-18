import {COLS, ROWS, BLOCK_SIZE, drawBoard, createBoard, drawGrid} from "./board.js";
import {TETROMINOS, getRandomTetromino} from "./tetrominos.js";
import {dropTetromino, moveTetromino, rotateTetromino} from "./move.js";
import {drawBlock, isValidMove} from "./utils.js";
import {calculateScore, finalScoreHandler} from "./score.js";

export const canvas = document.getElementById('gameCanvas');
export const context = canvas.getContext('2d');

export const nextCanvas = document.getElementById('nextCanvas');
export const nextContext = nextCanvas.getContext('2d');

// 캔버스의 너비와 높이를 설정합니다.
canvas.width = COLS * BLOCK_SIZE;
canvas.height = ROWS * BLOCK_SIZE;

// 게임 루프 설정
let board = createBoard();
let currentTetromino = getRandomTetromino();
let nextTetromino = getRandomTetromino();
let tetrominoPosition={x:4, y:0};
let gameOver = false;

export function updateScoreDisplay(score, lines, comboCounter) {
  //score
  const scoreElement = document.getElementById('score');
  scoreElement.innerText = `${score}`;
  //lines
  const linesElement = document.getElementById('lines');
  linesElement.innerText = `${lines}`;
  //combo
  const comboElement = document.getElementById('combo');
  comboElement.innerText = `${comboCounter}`;
}

function clearLines(board) {
  let lineCleared = 0;
  for (let row = ROWS - 2; row >= 0; row--) {
    if (board[row].every(cell => cell.value !== 0)) {
      lineCleared++;
      // 줄 삭제
      for (let r = row; r > 0; r--) {
        board[r] = board[r - 1];
      }
      // 맨 윗줄은 빈 줄로 설정
      board[0] = Array.from({ length: COLS }, (_, col) =>
        col === 0 || col === COLS - 1 ? { value: 1, color: 'gray' } : { value: 0, color: 'black' });
      row++; // 같은 줄을 다시 검사
    }
  }
  return lineCleared;
}

function checkGameOver(position, shape) {
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x] !== 0) {
        if (board[position.y + y][position.x + x].value !== 0) {
          return true;
        }
      }
    }
  }
  return false;
}

export function moveTetrominoDown() {
  if (isValidMove(currentTetromino, board, tetrominoPosition.x, tetrominoPosition.y + 1)) {
    tetrominoPosition.y += 1;
  } else {
    // 블록을 보드에 고정시키고, 새로운 블록을 생성
    for (let y = 0; y < currentTetromino.shape.length; y++) {
      for (let x = 0; x < currentTetromino.shape[y].length; x++) {
        if (currentTetromino.shape[y][x] !== 0) {
          board[tetrominoPosition.y + y][tetrominoPosition.x + x] = {
            value: 2,
            color: currentTetromino.color
          };
        }
      }
    }
    const linesCleared = clearLines(board);
    calculateScore(linesCleared);
    currentTetromino = nextTetromino;
    nextTetromino = getRandomTetromino();
    tetrominoPosition = { x: 4, y: 0 };
    if (checkGameOver(tetrominoPosition, currentTetromino.shape)) {
      gameOver = true;
      finalScoreHandler()
    }
  }
}

function handleKeyPress(event) {
  if (gameOver) return;

  switch (event.key) {
    case 'ArrowLeft':
      moveTetromino(currentTetromino, tetrominoPosition, board, -1, 0);
      break;
    case 'ArrowRight':
      moveTetromino(currentTetromino, tetrominoPosition, board, 1, 0);
      break;
    case 'ArrowDown':
      moveTetromino(currentTetromino, tetrominoPosition, board, 0, 1);
      break;
    case 'a':
      rotateTetromino(currentTetromino, board, tetrominoPosition, false);
      break;
    case 'd':
      rotateTetromino(currentTetromino, board, tetrominoPosition, true);
      break;
    case ' ':
      dropTetromino(currentTetromino, tetrominoPosition, board);
      moveTetrominoDown();
      break;
  }
}

document.addEventListener('keydown', handleKeyPress);

function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  //drawGrid(context, canvas);
  drawBoard(context, board);
  drawTetromino(context, currentTetromino, tetrominoPosition.x, tetrominoPosition.y);
  drawNextTetromino();

  if (!gameOver) {
    requestAnimationFrame(gameLoop);
  } else {
    // 게임 오버 메시지 표시
    context.fillStyle = 'red';
    context.font = '48px sans-serif';
    context.fillText('Game Over', canvas.width / 5, canvas.height / 2);
  }
}

function drawTetromino(context, tetromino, offsetX, offsetY) {
  tetromino.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        drawBlock(context, x + offsetX, y + offsetY, tetromino.color);
      }
    });
  });
}

function drawNextTetromino() {
  nextContext.clearRect(0,0, nextCanvas.width, nextCanvas.height);
  drawTetromino(nextContext, nextTetromino, 0, 0);
}

// 1초마다 블록을 한 칸씩 내리는 타이머 설정
setInterval(() => {
  if (!gameOver) {
    moveTetrominoDown();
  }
}, 1000);

// 게임 시작
gameLoop();
