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
 
  
   //function to print out the board in the console for debugging purposes(prints out the x)
       //select all the divs first
   const printGame = () => {
       //note that these 2 are arguments of the callback function. The way row is used in the next forEach tells JS that row rep each iterable
       //the way rowIndex is used to multiply shows that it is used as index, starting from 0
       board.forEach((row,rowIndex)=>{//for each row
           row.forEach((cell, cellIndex) =>{//for each array item in each row
               //print the item in the array onto the grid
               let gridIndex = rowIndex *3 +cellIndex;
               gridList[gridIndex].textContent = cell;
           })
       })
   }
   return {initialiseBoard,printGame};
}) ();
gameboard.printGame();
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

   //start game when start button clicks
   let startGame = (() =>{
   //add event listener to each grid and pop up dialog when start button clicked
    startBtn.addEventListener('click',()=>{
        playerNameDialog.showModal();
        gridList.forEach((grid)=>{//index rep the no. of the divs
            grid.addEventListener('click',markGrid); //pass by ref of function
        })
    })
    }) ();

    let inputName = (()=>{
        enterNameBtn.addEventListener('click',(e)=>{
            e.preventDefault();
            if(player1InputBox.value && player2InputBox.value){
                playerNameDialog.close();
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
               console.log('player 1 fired;');
           } else {
               boardArray[row][col] = player2.getMarking();
               grid.textContent = boardArray[row][col];
               whoseTurn = player1;
               console.log('player 2 fired');
           }


           // Once user presses the grid and marks it, remove event listener
           grid.removeEventListener('click', markGrid);
          
           //if win condition appears, remove all the event listener
           if(checkWin()){ //note that this function can be executed here bcoz this conditional check happens after js file loaded (hence function defined) and eventlistener attached, and happens when user clicks
               if (winner === player1){
                //display the winner in the text
                textDisplay.textContent = 'Player 1 wins!'
               }
               if (winner ===player2){
                textDisplay.textContent = 'Player 2 wins!'
               }
                gridList.forEach((grid)=>{//index rep the no. of the divs
                grid.removeEventListener('click',markGrid); //pass by ref of function
               })
           } 
       }   
   }

   //create a winner variable that contains the data of the winner
   let winner;

    const checkWin = ()=> {
        
        for (let i = 0; i < 3; i++) {
            //check for horizontal
            if (boardArray[i][0] && boardArray[i][0] === boardArray[i][1] && boardArray[i][1] === boardArray[i][2]) {
                if(boardArray[i][0]==='X'){winner = player1}
                else if(boardArray[i][0]==='O'){winner = player2}
                console.log('Horizontal strike! Game over!');
                return true;
            }
            //check for vertical
            if (boardArray[0][i] && boardArray[0][i] === boardArray[1][i] && boardArray[1][i] === boardArray[2][i]) {
                if(boardArray[0][i]==='X'){winner = player1}
                else if(boardArray[0][i]==='O'){winner = player2}
                console.log('Vertical strike! Game over!');
                return true;
            }
        }
        //2 diagonal strikes
        if (boardArray[0][0] && boardArray[0][0]=== boardArray[1][1] && boardArray[2][2]=== boardArray[1][1] ||
            boardArray[0][2] && boardArray[0][2]=== boardArray[1][1] && boardArray[2][0]=== boardArray[1][1]){
                if(boardArray[1][1]==='X'){winner = player1}
                else if(boardArray[1][1]==='O'){winner = player2}
                console.log('diagonal strike!');
                return true;
            }
        
        return false;
   };

   // //function to restart the game when restart button clicked
   const restartGame = (() => {
       restartbtn = document.querySelector('.restart_button');
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
               grid.addEventListener('click',markGrid); //pass by ref of function
           });
       })
   }) ();
  
}) ();


 
 
 


