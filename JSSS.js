document.addEventListener('DOMContentLoaded', () => {
    const boxes = document.querySelectorAll('.box');
    const turnBox = document.querySelector('.bg');
    const resultDisplay = document.querySelector('#results');
    const playAgainButton = document.querySelector('#play-again');
    let turn = 'X';
    let isGameOver = false;

    boxes.forEach(box => {
        box.innerHTML = "";
        box.addEventListener('click', () => {
            if (!isGameOver && box.innerHTML === "") {
                box.innerHTML = turn;
                checkWin();
                checkDraw();
                changeTurn();
            }
        });
    });

    function changeTurn() {
        turn = turn === 'X' ? 'O' : 'X';
        turnBox.style.left = turn === 'X' ? '0' : '85px';
    }

    function checkWin() {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        winConditions.forEach(condition => {
            const [a, b, c] = condition;
            const boxA = boxes[a].innerHTML;
            const boxB = boxes[b].innerHTML;
            const boxC = boxes[c].innerHTML;
            if (boxA !== '' && boxA === boxB && boxA === boxC) {
                isGameOver = true;
                resultDisplay.innerHTML = `${turn} wins!`;
                playAgainButton.style.display = 'inline';
                condition.forEach(index => {
                    boxes[index].style.backgroundColor = '#08D9D6';
                    boxes[index].style.color = '#000';
                });
            }
        });
    }

    function checkDraw() {
        if (!isGameOver) {
            const isDraw = Array.from(boxes).every(box => box.innerHTML !== '');
            if (isDraw) {
                isGameOver = true;
                resultDisplay.innerHTML = 'Draw';
                playAgainButton.style.display = 'inline';
            }
        }
    }

    playAgainButton.addEventListener('click', () => {
        isGameOver = false;
        turn = 'X';
        turnBox.style.left = '0';
        resultDisplay.innerHTML = '';
        playAgainButton.style.display = 'none';
        boxes.forEach(box => {
            box.innerHTML = '';
            box.style.removeProperty('background-color');
            box.style.color = '#fff';
        });
    });
});
