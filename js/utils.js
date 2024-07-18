import {BLOCK_SIZE, COLS, ROWS} from "./board.js";

export function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

//블록 양각 위한 색깔 뽑기
export function colorLuminance(hex, lum) {
  // Validate hex string
  hex = String(hex).replace(/[^0-9a-f]/gi, '');
  if (hex.length < 6) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  lum = lum || 0;

  // Convert to decimal and change luminosity
  let rgb = "#", c, i;
  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i * 2, 2), 16);
    c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
    rgb += ("00" + c).substr(c.length);
  }

  return rgb;
}

// 블록을 그리는 함수
export function drawBlock(context, x, y, color) {
  context.fillStyle = color;
  context.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);

  if(color !== 'black'){
    // Lighter top and left edges
    context.fillStyle = colorLuminance(color, 0.3);
    context.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, 3); // Top
    context.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, 3, BLOCK_SIZE); // Left

    // Darker bottom and right edges
    context.fillStyle = colorLuminance(color, -0.3);
    context.fillRect((x + 1) * BLOCK_SIZE - 3, y * BLOCK_SIZE, 3, BLOCK_SIZE); // Right
    context.fillRect(x * BLOCK_SIZE, (y + 1) * BLOCK_SIZE - 3, BLOCK_SIZE, 3); // Bottom
  }

  context.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
}

//이동
export function isValidMove(tetromino, board, offsetX, offsetY) {
  for (let y = 0; y < tetromino.shape.length; y++) {
    for (let x = 0; x < tetromino.shape[y].length; x++) {
      if (tetromino.shape[y][x] !== 0) {
        const newX = x + offsetX;
        const newY = y + offsetY;
        if (newX < 0 || newX >= COLS || newY >= ROWS || board[newY][newX].value !== 0) {
          return false;
        }
      }
    }
  }
  return true;
}
