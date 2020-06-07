// global varibles for game state, board grid size, current player, game over.

const createGrid = 3;
let gameBoard = [];
let currentPlayer = 'One';
let gameOver = false;
let message = $('.message');

// build the gameBoard as an array of arrays using a nested for loop
// set [i] to null array as variable row, and set row[j] to null as variable col
// declare variable square and assign row and col using .data() method
// this will gives access to the row and column later in other functions

function buildBoard() {
    for (let i = 0; i < createGrid; i++) {
        gameBoard[i] = [];
        let row = gameBoard[i];
        for (let j = 0; j < createGrid; j++) {  
            row[j] = null;   
            let square = $(`<div class="square">`);
            square.data('row', i);
            square.data('col', j); 
            $('.board').append(square);
        }
    }
};
buildBoard();

// check if game is over, then declare row & col from .data() method
// if [row][col] is not null, prevent second click
// check currentPlayer and toggle to other player
// update the 'x' or 'o' in the UI and in the gameBoard array
// invoke checkForWins(), then update messaging in the UI


function renderBoard() {
    if(!gameOver) {
        let row = $(this).data().row;
        let col = $(this).data().col;
        if(gameBoard[row][col] == null) {
            if(currentPlayer == 'One') {
                currentPlayer = 'Two';
                $(this).text('x').css('color','#980F20');
                gameBoard[row][col] = 'x';
            } else {
                currentPlayer = 'One';
                $(this).text('o').css('color','#1261A0');
                gameBoard[row][col] = 'o';
            }
        }
        checkForWin();
        gameOver 
            ? message.text(`Player ${ currentPlayer } Wins The Game!`)
            : message.text(`Player ${ currentPlayer } Goes Next...`) 
    }   
}
$('.square').click(renderBoard)

// loop through rows and cols to set up variables for i and j
// check gameBoard for matching conditions on rows, cols, and diags 
// if conditions match mark gameOver and return true

function checkForWin() {
    for (let i = 0; i < createGrid; i++) {
        for(let j = 0; j <createGrid; j++) {
            // check rows for win
            if(gameBoard[i][0] == gameBoard[i][1] && gameBoard[i][1] == gameBoard[i][2] && gameBoard[i][j] != null ) {
                gameOver = true;
                return true;
            }
            // check cols for win
            if(gameBoard[0][j] == gameBoard[1][j] && gameBoard[1][j] == gameBoard[2][j] && gameBoard[i][j] != null ) {
                gameOver = true;
                return true;
            }
            // check diags for win 
            if ( gameBoard[0][0] == gameBoard[1][1] && gameBoard[1][1] == gameBoard[2][2] && gameBoard[1][1] != null ) {
                gameOver = true;
                return true;
            }
            // check diags for win 
            if ( gameBoard[0][2] == gameBoard[1][1] && gameBoard[1][1] == gameBoard[2][0] && gameBoard[1][1] != null) {
                gameOver = true;
                return true;
            }
        }
    }
}

// on button click to clear UI and set gameBoard array to default state
// set gameOver to false and set currentPlayer to player one
// set the messaging back to default state

function resetGame() {
    gameOver = false;
    $('.square').empty();
    gameBoard = [
        [null, null, null], 
        [null, null, null], 
        [null, null, null]
    ] 
    currentPlayer = 'One';
    message.text('Player One Goes First...');
}
$('.btn-reset').click(resetGame);