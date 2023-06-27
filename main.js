const gameStatus = document.querySelector('.game--status');

let gameActive = true;

let currentPlayer = 'X';

let gameState = ["","","","","","","","",""];

const winingMessage = ()=>{
    return `Player ${currentPlayer} has Won`;
}
const drowMessage = ()=>{
   return 'Game ended in draw';
}
const currentPlayerTurn = ()=>{
    return `Its ${currentPlayer} turn's`;
}

gameStatus.innerHTML = currentPlayerTurn();

function handelCellPlayed(clickedCell,clickIndex){
    gameState[clickIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer

}
function handlePlayChange(){
    currentPlayer = currentPlayer==='X'?'O':'X';
    gameStatus.innerHTML = currentPlayerTurn();
}
const winingCondition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
function handleResultValidation(){
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winingCondition[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

        if(a===''||b===''||c===''){
            continue;
        }
        if(a===b && b===c){
            roundWon=true;
            break;
        }
        
    }
    if(roundWon){
        gameStatus.innerHTML = winingMessage();
        gameActive= false;
        return;
    }

    handlePlayChange();



}
function handleCellClick(e){
    const clickedCell = e.target;
    // console.log(clickedCell);
    const clickedCellIndex = parseInt(
        clickedCell.getAttribute('data-cell-index')
    );
    if(gameState[clickedCellIndex]!==""||!gameActive){
        return;
    }
    // console.log(clickedCellIndex);
    handelCellPlayed(clickedCell,clickedCellIndex);
    handleResultValidation();
}
function handleRestartGame(){
    gameActive = true;
    currentPlayer = 'X';
    gameState = ["","","","","","","","",""];
    gameStatus.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell')
    .forEach(cell=>cell.innerHTML="");

}
document.querySelectorAll('.cell').forEach(cell=>cell.addEventListener('click',handleCellClick));
document.querySelector('.game--restart').addEventListener('click',handleRestartGame);
