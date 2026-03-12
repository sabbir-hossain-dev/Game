let board = ["","","","","","","","",""];
let currentPlayer = "X";
let gameActive = true;

const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

const winPatterns = [
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]
];

cells.forEach(cell=>{
    cell.addEventListener("click", handleClick);
});

function handleClick(){

    let index = this.getAttribute("data-index");

    if(board[index] !== "" || !gameActive){
        return;
    }

    board[index] = currentPlayer;
    this.textContent = currentPlayer;

    if(checkWinner()){
        statusText.textContent = "Player " + currentPlayer + " Wins!";
        gameActive = false;
        return;
    }

    if(!board.includes("")){
        statusText.textContent = "Game Draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = "Player " + currentPlayer + " Turn";
}

function checkWinner(){

    for(let pattern of winPatterns){

        let a = pattern[0];
        let b = pattern[1];
        let c = pattern[2];

        if(board[a] && board[a] === board[b] && board[a] === board[c]){
            return true;
        }
    }

    return false;
}

function resetGame(){

    board = ["","","","","","","","",""];
    currentPlayer = "X";
    gameActive = true;

    cells.forEach(cell=>{
        cell.textContent = "";
    });

    statusText.textContent = "Player X Turn";

}

function minimax(board, depth, isMax, alpha, beta){

    if(checkWinner("O")) return 1
    if(checkWinner("X")) return -1
    if(isDraw()) return 0

    if(isMax){

        let best = -Infinity

        for(let i=0;i<9;i++){

            if(board[i]==""){

                board[i]="O"

                let score = minimax(board,depth+1,false,alpha,beta)

                board[i]=""

                best = Math.max(best,score)
                alpha = Math.max(alpha,best)

                if(beta <= alpha) break
            }
        }

        return best
    }

}
