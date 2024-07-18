import {updateScoreDisplay} from "./game.js";

let score = 0;
let lines=0;
let comboCounter = 0;

export function calculateScore(linesCleared) {
  let lineScore = 0;
  switch (linesCleared) {
    case 1:
      lineScore = 100;
      break;
    case 2:
      lineScore = 300;
      break;
    case 3:
      lineScore = 500;
      break;
    case 4:
      lineScore = 800;
      break;
  }

  if (linesCleared > 0) {
    comboCounter+=1;
    score += lineScore * (1+(0.2*(comboCounter-1)));
    lines+=linesCleared;
  } else {
    comboCounter = 0; // 콤보 초기화
  }
  updateScoreDisplay(score, lines, comboCounter);
}

export function finalScoreHandler() {
  finalScoreElement.innerText = `Score: ${score}`;
  finalLinesElement.innerText = `Lines: ${lines}`;
  gameOverModal.style.display = "block";
}
