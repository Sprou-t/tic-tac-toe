let gridList = document.querySelectorAll('.grid');


//create gameboard obj using IIFE as we only need to create 1 obj
// store the gameboard in a 2d array inside of a gameboard Object
let gameboard = (()=>{
   let board = [ //initial board
       ['','',''], //note that an empty string is considered falsy
       ['','',''],
       ['','','']
   ]
   //function to initialise the board
   const initialiseBoard = () => board;
 
   return {initialiseBoard};
}) ();

//create 2 player objs using factory function(can be reused)
let player = (name,marking) =>{
 
   const getName = () => name;
   const getMarking = () => marking;
   return {getName,getMarking}
}


//create a gamecontroller object to control the game using all the conditionals!
let gameController = (() =>{
   let player1 = player('Player 1','X');
   let player2 = player('Player 2','O');

   //create the board array
   let boardArray = gameboard.initialiseBoard();

   //let player1 take the 1st turn
   let whoseTurn = player1;

   
   let textDisplay = document.querySelector('.text_display');
   let startBtn = document.querySelector('.start');
   let playerNameDialog = document.querySelector('.dialog_for_name');
   let enterNameBtn = document.querySelector('.enter_name_btn');
   let player1InputBox = document.querySelector('#player1_input');
   let player2InputBox = document.querySelector('#player2_input');
   let gameInstructorDiv = document.querySelector('.game_instructor')
   let player1Name;
   let player2Name;

   //start game when start button clicks
   let startGame = () =>{
   //add event listener to each grid and pop up dialog when start button clicked
        playerNameDialog.showModal();
        gridList.forEach((grid)=>{//index rep the no. of the divs
            grid.addEventListener('click',markGrid); //pass by ref of function
        })  
    } 
    startBtn.addEventListener('click',startGame)

    let inputPlayerName = (()=>{
        enterNameBtn.addEventListener('click',(e)=>{
            e.preventDefault();
            if(player1InputBox.value && player2InputBox.value){
                playerNameDialog.close();
                player1Name = player1InputBox.value;
                player2Name = player2InputBox.value;
                gameInstructorDiv.textContent = `${player1Name}'s turn!`;
                startBtn.removeEventListener('click',startGame);
            }
        })
    }) ();

   //create function
   const markGrid = (event) =>{
       let grid = event.target;//another way of getting the DOM for the specific grid that is clicked
       let convertNodelistIntoArray = Array.from(gridList);
       let indexOfGrid = convertNodelistIntoArray.indexOf(grid);
       let col = indexOfGrid % 3;
       let row = parseInt(indexOfGrid / 3);


       if (!grid.textContent) { // Check if the grid is already marked
           if (whoseTurn == player1) {
               // Mark the array
               boardArray[row][col] = player1.getMarking(); // Remember the (), without it, I am calling a property
               // Transfer the array content to grid to mark it
               grid.textContent = boardArray[row][col];
               whoseTurn = player2;
               gameInstructorDiv.textContent = `${player2Name}'s turn!`
           } else {
               boardArray[row][col] = player2.getMarking();
               grid.textContent = boardArray[row][col];
               whoseTurn = player1;
               console.log('player 2 fired');
               gameInstructorDiv.textContent = `${player1Name}'s turn!`
           }


            // Once user presses the grid and marks it, remove event listener
            grid.removeEventListener('click', markGrid);
          
           //if win condition appears, remove all the event listener
            if(checkWin()){ //note that this function can be executed here bcoz this conditional check happens after js file loaded (hence function defined) and eventlistener attached, and happens when user clicks
                if (winner === player1){
                    //display the winner in the text
                    gameInstructorDiv.textContent = `${player1Name} wins!`
                }
                if (winner ===player2){
                    textDisplay.textContent = `${player2Name} wins!`
                }
                //change the background color of the winning grids
                highlightWinningLine(winningLine); //need to input the argument again as winningLine will only be updated when checkWin is truthy
                gridList.forEach((grid)=>{//index rep the no. of the divs
                    grid.removeEventListener('click',markGrid); //pass by ref of function
               })
           } 
       }   
   }

   //create a winner variable that contains the data of the winner
   let winner;
   let winningLine = [];

    const checkWin = ()=> {
        for (let i = 0; i < 3; i++) {
            //check for horizontal
            if (boardArray[i][0] && boardArray[i][0] === boardArray[i][1] && boardArray[i][1] === boardArray[i][2]) {
                if(boardArray[i][0]==='X'){
                    winner = player1}

                else if(boardArray[i][0]==='O'){
                    winner = player2}
                
                winningLine = [
                    {row:i, col:0},
                    {row:i, col:1},
                    {row:i, col:2}
                ];
                return true;
            }
            //check for vertical
            if (boardArray[0][i] && boardArray[0][i] === boardArray[1][i] && boardArray[1][i] === boardArray[2][i]) {
                if(boardArray[0][i]==='X'){
                    winner = player1}

                else if(boardArray[0][i]==='O'){
                    winner = player2}
                
                winningLine = [
                    { row: 0, col: i },
                    { row: 1, col: i },
                    { row: 2, col: i }
                ];
                return true;
            }
        }
        // Check for diagonals
        if (boardArray[0][0] && boardArray[0][0] === boardArray[1][1] && boardArray[1][1] === boardArray[2][2]) {
        winner = boardArray[0][0] === 'X' ? player1 : player2;
        winningLine = [
            { row: 0, col: 0 },
            { row: 1, col: 1 },
            { row: 2, col: 2 }
        ];
        return true;
        }

        if (boardArray[0][2] && boardArray[0][2] === boardArray[1][1] && boardArray[1][1] === boardArray[2][0]) {
            winner = boardArray[0][2] === 'X' ? player1 : player2;
            winningLine = [
                { row: 0, col: 2 },
                { row: 1, col: 1 },
                { row: 2, col: 0 }
            ];
            return true;
        }
        
        return false;
   };

   const highlightWinningLine = (winningLine) => {
    winningGrids.forEach(eachWinningGrid => {
        let gridIndex = eachWinningGrid.row * 3 + eachWinningGrid.col;
        gridList[gridIndex].style.backgroundColor = 'green';
    });
};

   // //function to restart the game when restart button clicked
   const restartGame = (() => {
       restartbtn = document.querySelector('.restart');
       restartbtn.addEventListener('click',() => {//clears the entire array
           console.log('restart!');
           whoseTurn = player1; //turn back to player1
           for(let i = 0; i<3; i++){
                for(let j = 0; j<3; j++){
                    boardArray[i][j]=''; //clear the array
                }
            }
            //renew UI
            gridList.forEach(grid => {
                grid.textContent = '';
           
                //clear the game_instructor paragraph & input section in the dialog
                gameInstructorDiv.textContent='Press start!';
                player1InputBox.value = '';
                player2InputBox.value = '';

                //clear the winning highlight background color and the array
                grid.style.backgroundColor = 'black'
                winningLine = [];

                //addeventlistener back to start button
                startBtn.addEventListener('click',startGame);
           
            });
       })
   }) ();
  
}) ();


 
 
 


