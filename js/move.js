import {rotateMatrix} from "./tetrominos.js";
import {isValidMove} from "./utils.js";

export function moveTetromino(tetromino, position, board, offsetX, offsetY) {
  if (isValidMove(tetromino, board, position.x + offsetX, position.y + offsetY)) {
    position.x += offsetX;
    position.y += offsetY;
  }
}

export function rotateTetromino(tetromino, board, position, clockwise) {
  const rotatedShape = rotateMatrix(tetromino.shape, clockwise);
  if (isValidMove({ shape: rotatedShape, color: tetromino.color }, board, position.x, position.y)) {
    tetromino.shape = rotatedShape;
  }
}

export function dropTetromino(tetromino, position, board) {
  while (isValidMove(tetromino, board, position.x, position.y + 1)) {
    position.y += 1;
  }
}
