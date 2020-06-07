let gameState = {
    gameBoard: [ 
        null, null, null,
        null, null, null,
        null, null, null
    ]
}

const numberSquares = 9;
let currentPlayer = 1;
let message = $('.current-turn');

// done: build a board from the html / css grid
// input: get number of squares from global variable and send to loop
// output: loop and append a square div for each iteration to the board div

function buildBoard() {
    board = $('.board');
    for (let index = 0; index < numberSquares; index++) {
        square = $(`<div id="${index}" class="square">`);
        board.append(square);
    }
};
buildBoard();

// done: click on square and populate with an x or o
// done: toggle between player 1 & 2
// done: show message for who's turn it is
// done: send data to be stored in gameState object based on index
// done: prevent captured square from being clicked again
// goal: computer takes a turn

// make the computer take a turn here
// find all squares that still null
// choose one of those squares randomly
// artificially clicked the square 
// move.attr('data-won', 'x');

function renderBoard() {
    let move = $(this);
    let index = $(this).attr('id');
    if( gameState.gameBoard[index] == null ) {
        if( currentPlayer == 1 ) {
            currentPlayer = 2;
            move.text('x')  ;
            move.attr('data-score', 'x')
        } else {
            currentPlayer = 1;
            move.text('o');
            move.attr('data-score', 'o')
        }
        score = move.attr('data-score');
        gameState.gameBoard.splice(index, 1, score)
        checkWin()
        message.text(`Player ${ currentPlayer } Goes Next...`);
    }
}
$('.square').click(renderBoard)

// function checkForWins() {
//     let winner = '';
//     const winConditions = [
//         [0,1,2],
//         [3,4,5],
//         [6,7,8],
//         [0,3,6],
//         [1,4,7],
//         [2,5,8],
//         [0,4,8],
//         [2,4,6]
//     ]
// }

function checkWin(){
    if(gameState.gameBoard[0] === "x" &&
        gameState.gameBoard[1] === "x" &&
        gameState.gameBoard[2] === "x"
    ) { alert("Win")}
    else if (
        gameState.gameBoard[3] === "x" &&
        gameState.gameBoard[4] === "x" &&
        gameState.gameBoard[5] === "x"
    ) { alert("Win")}
     else if (
        gameState.gameBoard[6] === "x" &&
        gameState.gameBoard[7] === "x" &&
        gameState.gameBoard[8] === "x"
    ) { alert("Win")}
    // etc / abandoned after this
  }

function resetGame() {
    $('.square').empty();
    $('.square').attr('data-score', '');
    gameState = {
        gameBoard: [ null, null, null, null, null, null, null, null, null ]
    }
    currentPlayer = 1;
    message.text('Player One Goes First...');
    alert('Start New Game');
}
$('.btn-reset').click(resetGame);
