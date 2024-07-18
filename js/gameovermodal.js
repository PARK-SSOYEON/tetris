// 모달 요소
const gameOverModal = document.getElementById('gameOverModal');
const finalScoreElement = document.getElementById('finalScore');
const finalLinesElement = document.getElementById('finalLines');
const restartButton = document.getElementById('restartButton');

// 모달 닫기 버튼
const closeModalButton = document.querySelector('.modal .close');

closeModalButton.onclick = () => {
  gameOverModal.style.display = "none";
};

// 모달 창 바깥을 클릭하면 모달 창 닫기
window.onclick = (event) => {
  if (event.target === gameOverModal) {
    gameOverModal.style.display = "none";
  }
};

// 다시 시작 버튼 클릭 이벤트
restartButton.onclick = () => {
  location.reload();
};
