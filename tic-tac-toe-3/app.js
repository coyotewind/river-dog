// global constant variable for board grid size
// global let variables for game state, current player, game over & messaging

const createGrid = 3;
let gameBoard = [];
let currentPlayer = 'One';
let winningPlayer = 'Two';
let gameOver = false;
let message = $('.message');
let counter = 0;
let isDraw = false;

// build the gameBoard as an array of arrays using a nested for loop
// set gamboare[i] to null & assign row variable, and set row[j] & assign col variable
// declare variable square, set up the id to be used later for computerTurn()
// using .data() method attach row as i and j as col, to be used later in renderBoard()

function buildBoard() {
    for (let i = 0; i < createGrid; i++) {
        gameBoard[i] = [];
        let row = gameBoard[i];
        for (let j = 0; j < createGrid; j++) {  
            row[j] = null;   
            let square = $(`<div id="index-${i}-${j}" class="square">`);
            square.data('row', i);
            square.data('col', j); 
            $('.board').append(square);
        }
    }
};
buildBoard();

// declare row & col from .data() method
// if [row][col] is not null, prevent second click
// check currentPlayer and toggle to other player
// update the 'x' or 'o' in the UI and in the gameBoard array
// invoke checkForWins(), then update messaging in the UI

function renderBoard() {
    let row = $(this).data().row;
    let col = $(this).data().col;
    if(!gameOver) { 
        if(gameBoard[row][col] == null) {
            if(currentPlayer == 'One') {
                winningPlayer = 'One'
                currentPlayer = 'Two';
                $(this).text('x').css('color','#980F20');
                gameBoard[row][col] = 'x';
                counter++
                console.log(counter);
                checkForWin();
            } 
        }
        checkGameOver();
        checkForDraw();
        autoPlay();
    }   
}
$('.square').click(renderBoard)


// set up empty cells array variable & loop through & create array of available cells 
// choose a random cell from array of availalbe cells and map indices to varibles
// update the array notating square captured by computer and update the UI
// update the current player and winning player status
// todo: figure out how to invoke the computer player
// todo: also check for win and game over

function computerTurn() {

    if(counter < 9 ) {
        let cells = [];
        for (let i = 0; i < createGrid; i++) {
            for(let j = 0; j <createGrid; j++) {
                if(!gameBoard[i][j]) {
                    cells.push([i,j]);
                }
            }
        }

        move = cells[Math.floor(Math.random() * cells.length)];
        row = move[0]; col = move[1];

        gameBoard[row][col] = 'o';

        cell = document.getElementById('index-' + row + '-' + col);
        cell.innerHTML = 'o'; cell.style.color="#1261A0"

        currentPlayer = 'One'; 
        winningPlayer = 'Two'
        
        counter++
        console.log(counter);

        checkForWin();
        checkGameOver();
    }

}

function autoPlay() {
    setTimeout(function(){ computerTurn(); }, 1000);
}

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

function checkForDraw() {
    if(!gameOver && counter == 9) {
        isDraw = true;
        message.text(`It's a draw! Want To Play Again?`);
    } 
}

function checkGameOver() {
    gameOver == true && isDraw == false
        ? message.text(`Player ${ winningPlayer } Wins The Game!`)
        : message.text(`Player ${ currentPlayer } Goes Next...`)
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
    winningPlayer = 'Two';
    message.text('Player One Goes First...');
    counter = 0;
    isDraw = false;
}
$('.btn-reset').click(resetGame);

// STRETCH: Allow user to choose X or O before game starts but X will always go first
// STRETCH: Create score board for games won
// STRETCH: The winner of the previous game will alawys go first
// STRETCH: Button to clear score board, reset game (restore who goes first to default)