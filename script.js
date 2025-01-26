const rows = 15;
const cols = 15;
const chessboard = document.getElementById('chessboard');
const message = document.getElementById('message');
let currentPlayer = 'black';
let board = Array(rows).fill().map(() => Array(cols).fill(null));

function createBoard() {
    chessboard.innerHTML = ''; // 清空棋盘
    board = Array(rows).fill().map(() => Array(cols).fill(null)); // 重置棋盘数据
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener('click', handleMove);
            chessboard.appendChild(cell);
        }
    }
    currentPlayer = 'black';
    message.textContent = `${currentPlayer}'s turn`;
}

function handleMove(event) {
    const row = event.target.dataset.row;
    const col = event.target.dataset.col;

    if (board[row][col] !== null) {
        return;
    }

    board[row][col] = currentPlayer;
    event.target.classList.add(currentPlayer);

    if (checkWin(row, col)) {
        message.textContent = `${currentPlayer} wins!`;
        chessboard.removeEventListener('click', handleMove);
        setTimeout(createBoard, 5000); // 10秒后重新开始游戏
        return;
    }

    currentPlayer = currentPlayer === 'black' ? 'blue' : 'black';
    message.textContent = `${currentPlayer}'s turn`;
}

function checkWin(row, col) {
    return checkDirection(row, col, 1, 0) || // Horizontal
           checkDirection(row, col, 0, 1) || // Vertical
           checkDirection(row, col, 1, 1) || // Diagonal \
           checkDirection(row, col, 1, -1);  // Diagonal /
}

function checkDirection(row, col, rowDir, colDir) {
    let count = 1;
    count += countStones(row, col, rowDir, colDir);
    count += countStones(row, col, -rowDir, -colDir);
    return count >= 5;
}

function countStones(row, col, rowDir, colDir) {
    let count = 0;
    let r = parseInt(row) + rowDir;
    let c = parseInt(col) + colDir;

    while (r >= 0 && r < rows && c >= 0 && c < cols && board[r][c] === currentPlayer) {
        count++;
        r += rowDir;
        c += colDir;
    }

    return count;
}

createBoard();