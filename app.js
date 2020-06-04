// global varibles for game state, board grid size, and current player

let gameBoard = [];
const createGrid = 3;
let currentPlayer = 1;


// build the gameBoard as rows and columns as an array of arrays using a nested for loop
// use for loop to set up empty array for each row and declare variable for identifying row by index
// use another for loop to create the columns inside of each row and set the column value as null
// declare variable square to represent each cell and assign row and color using .data() method
// this will gives access to the tow for row and column in other functions.

function buildBoard() {
    for (let i = 0; i < createGrid; i++) {
        gameBoard[i] = [];
        let row = gameBoard[i];
        for (let j = 0; j < createGrid; j++) {  
            row[j] = null;   
            let square = $(`<div class="square" data-row="${i}" data-col="${j}">`);
            square.data('row', i);
            square.data('col', j); 
            $('.board').append(square);
        }
    }
};
buildBoard();


// build click handler to render the board
// declare variables for row & col indices
// check if row and col is not null and allow click
// check who is current play and toggle variable to the other player
// update the text as 'x' or 'o' in the UI
// update gameBoard array storing either an 'x' or 'o'
// invoke the checkForWins() function 
// todo: add checl for diagnal to checkForWins() function
// todo: create some messaging or alert for the win
// todo: prevent game play from continuing after win

function renderBoard() {

    let row = $(this).data().row;
    let col = $(this).data().col;

    if(gameBoard[row][col] == null ) {
        if( currentPlayer == 1 ) {
            currentPlayer = 2;
            $(this).text('x') ;
            gameBoard[row][col] = 'x'
            
        } else {
            // invoke computerTurn() here
            currentPlayer = 1;
            $(this).text('o');
            gameBoard[row][col] = 'o';
        }
    }

    checkForWin();

    $('.current-turn').text(`Player ${ currentPlayer } Goes Next...`);

}
$('.square').click(renderBoard)


// function computerTurn() {
    // goal: make the computer take a turn
    // input: find all squares that are still null and choose one randomly
    // set a timeout and then artificially click the square 
// }


// loop through rows and cols to set up variable for i and j
// check that indices are not null and continue
// check gameBoard rows for matching combination
// check gameBoard cols for matching combination
// todo: add check for diagnal win here
// todo: write a check if 0,0 1,1 2,2 match or
// todo: write a check if 2,0 1,1 0,2 match

function checkForWin() {
    for (let i = 0; i < createGrid; i++) {
        for(let j = 0; j <createGrid; j++) {
            if( gameBoard[i][j] !== null ) {
                if( gameBoard[i][0] === gameBoard[i][1] && gameBoard[i][1] === gameBoard[i][2]) {
                    console.log('you win');
                    return true;
                }
                else if( gameBoard[0][j] === gameBoard[1][j] && gameBoard[i][1] === gameBoard[2][j]) {
                    console.log('you win');
                    return true;
                }
                //add diagnal check here
            }
        }
    }
}


// click handler attached to button to reset game
// empty all the square of existing conent
// clear the array back to the default state
// set current play variable back to player one
// set the current turn messaging back to default
// temporary: use alert to indicate new game

function resetGame() {
    $('.square').empty();
    gameBoard = [
        [null, null, null], 
        [null, null, null], 
        [null, null, null]
    ] 
    currentPlayer = 1;
    $('.current-turn').text('Player One Goes First...');
    alert('Start New Game');
}
$('.btn-reset').click(resetGame);

// STRETCH: Allow user to choose X or O before game starts but X will always go first
// STRETCH: Create score board for games won
// STRETCH: The winner of the previous game will alawys go first
// STRETCH: Button to clear score board, reset game (restore who goes first to default)