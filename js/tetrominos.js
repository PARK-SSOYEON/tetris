import {shuffle} from "./utils.js";

export const TETROMINOS = {
  I: {
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    color: '#037ef3'
  },
  J: {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0]
    ],
    color: '#f85a40'
  },
  L: {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0]
    ],
    color: '#00c16e'
  },
  O: {
    shape: [
      [1, 1],
      [1, 1]
    ],
    color: '#7552cc'
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0]
    ],
    color: '#0cb9c1'
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0]
    ],
    color: '#f48924'
  },
  Z: {
    shape:  [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0]
    ],
    color: '#ffc845'
  }
};

let bag = [];

function getNewBag() {
  const tetrominoKeys = Object.keys(TETROMINOS);
  return shuffle(tetrominoKeys);
}

export function getRandomTetromino() {
  if (bag.length === 0) {
    bag = getNewBag();
  }
  const randomKey = bag.pop();
  return TETROMINOS[randomKey];
}

export function rotateMatrix(matrix, clockwise = true) {
  const N = matrix.length;
  const result = matrix.map((row, i) =>
    row.map((_, j) =>
      clockwise ? matrix[N - j - 1][i] : matrix[j][N - i - 1]
    )
  );
  return result;
}
