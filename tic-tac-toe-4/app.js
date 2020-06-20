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
let xScore = 0;
let yScore = 0;

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
            } 
        }
        updateAll();
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

    if(!gameOver && counter < 9) {
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
        updateAll();
    }

}

function autoPlay() {
    setTimeout(function(){ computerTurn(); }, 1000);
}

// loop through rows and cols to set up variables for i and j
// check gameBoard for matching conditions on rows, cols, and diags 
// if conditions match mark gameOver and return true

function checkForWin() {
    // check rows for win
    for ( let row = 0; row < createGrid; row++) {
        if ( gameBoard[row][0] === gameBoard[row][1] && gameBoard[row][1] === gameBoard[row][2] && gameBoard[row][1] !== null) {
            gameOver = true;
            return true;
        }
    }
    // check col for win
    for ( let col = 0; col < createGrid; col++) {
        if ( gameBoard[0][col] === gameBoard[1][col] && gameBoard[1][col] === gameBoard[2][col] && gameBoard[1][col] !== null ) {
            gameOver = true;
            return true;
        }
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

function checkGameOver() {
    gameOver == true && isDraw == false
        ? message.text(`Player ${ winningPlayer } Wins The Game!`)
        : message.text(`Player ${ currentPlayer } Goes Next...`)
}

function checkForDraw() {
    if(!gameOver && counter == 9) {
        isDraw = true;
        message.text(`It's a draw! Want To Play Again?`);
    } 
}

function winCounter() {
    if(gameOver == true && isDraw == false && winningPlayer == 'One') {
        xScore++;
        $('.x-score').text(xScore);

        console.log(xScore,'x wins');
    } 
    if(gameOver == true && isDraw == false && winningPlayer == 'Two') {
        yScore++;
        $('.y-score').text(yScore);
        console.log(yScore,'y wins');
    } 
}

function updateAll() {
    checkForWin();
    checkGameOver();
    checkForDraw();
    winCounter();
}

// on button click to clear UI squares and set gameBoard array to default state
// set currentPlayer to player one, winnerPlayer to player two
// set the messaging back to default state and rest counter to zero
// set gameOver and isDraw to false

function resetGame() {
    $('.square').empty();
    gameBoard = [[null, null, null], [null, null, null], [null, null, null]] 
    currentPlayer = 'One';
    winningPlayer = 'Two';
    message.text('Player One Goes First...');
    counter = 0;
    gameOver = false;
    isDraw = false;
    
}
$('.btn-new-game').click(resetGame);

function resetMatch() {
    xScore = 0;
    yScore = 0;
    $('.x-score').text(xScore);
    $('.y-score').text(xScore);
    resetGame();
}
$('.btn-reset-match').click(resetMatch);

// STRETCH: Allow user to choose X or O before game starts but X will always go first
// STRETCH: Create score board for games won
// STRETCH: The winner of the previous game will alawys go first
// STRETCH: Button to clear score board, reset game (restore who goes first to default)