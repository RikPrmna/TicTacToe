let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameStatus = '';
let gameOver = false;

// Skor pemain
let scoreX = 0;
let scoreO = 0;

// Suara
const clickSound = new Audio('sound/click.mp3');
const winSound = new Audio('sound/win.mp3');
const drawSound = new Audio('sound/draw.mp3');

// Fungsi memainkan suara
function playClickSound() {
    clickSound.play();
}
function playWinSound() {
    winSound.play();
}
function playDrawSound() {
    drawSound.play();
}

// Fungsi update skor ke tampilan
function updateScore() {
    document.getElementById('scoreX').textContent = scoreX;
    document.getElementById('scoreO').textContent = scoreO;
}

// Fungsi reset board (tanpa reset skor)
function resetBoard() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameStatus = '';
    gameOver = false;
    renderBoard();
}

// Fungsi cek pemenang
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameStatus = `Player ${board[a]} wins!`;

            if (board[a] === 'X') {
                scoreX++;
            } else {
                scoreO++;
            }

            playWinSound();
            updateScore();
            gameOver = true;

            // Auto-reset setelah 2 detik
            setTimeout(resetBoard, 2000);
            return true;
        }
    }

    if (!board.includes('')) {
        gameStatus = "It's a draw!";
        playDrawSound();
        gameOver = true;

        // Auto-reset setelah 2 detik
        setTimeout(resetBoard, 2000);
        return true;
    }

    return false;
}

// Render papan dan status
function renderBoard() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';

    board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.textContent = cell;
        cellElement.addEventListener('click', () => handleClick(index));
        boardElement.appendChild(cellElement);
    });

    const statusElement = document.getElementById('status');
    statusElement.textContent = gameStatus || `Current player: ${currentPlayer}`;

    updateScore();
}

// Handle klik
function handleClick(index) {
    if (gameOver || board[index] !== '') return;

    board[index] = currentPlayer;
    playClickSound();
    renderBoard();

    if (checkWinner()) {
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Restart manual (jika user klik tombol)
document.getElementById('restartBtn').addEventListener('click', () => {
    resetBoard();
});

// Render awal
renderBoard();
