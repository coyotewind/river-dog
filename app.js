// global varibles for game state, board grid size, current player, game over.

const createGrid = 3;
let gameBoard = [];
let currentPlayer = 'One';
let gameOver = false;
let message = $('.message');

// build the gameBoard as rows and columns as an array of arrays using a nested for loop
// set [i] to a null array to represent the row and set row[j] to null to represent the column
// declare variable square to represent each cell and assign row and color using .data() method
// this will gives access to the tow for row and column in other functions.

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

// build click handler to render board, first check if game is not over
// then declare variables for row & col indices from .data() method
// check if row and col is not null to prevent second click
// check currentPlayer and toggle current Player to other player
// update the 'x' or 'o' in the UI and in the gameBoard array
// invoke checkForWins() then update messaging in the UI

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
                // invoke computerTurn() here
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


// function computerTurn() {
    // goal: make the computer take a turn
    // input: find all squares that are still null and choose one randomly
    // set a timeout and then artificially click the square 
// }


// loop through rows and cols to set up variables for i and j
// check that indices are not null and continue
// check gameBoard for matching conditions (rows, cols, diags)
// if conditions match mark gameOver true and return true

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

// click handler attached to button to reset game
// empty all the squares of existing conent
// clear the gameBoard array back to the default state
// set current play variable back to player one
// set the current turn messaging back to default
// temporary: use alert to indicate new game

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
    // alert('Start New Game');
}
$('.btn-reset').click(resetGame);

// STRETCH: Allow user to choose X or O before game starts but X will always go first
// STRETCH: Create score board for games won
// STRETCH: The winner of the previous game will alawys go first
// STRETCH: Button to clear score board, reset game (restore who goes first to default)