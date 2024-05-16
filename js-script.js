//global variable
let gridList = document.querySelectorAll('.grid');

//create gameboard obj using IIFE as we only need to create 1 obj
// store the gameboard in a 2d array inside of a gameboard Object
let gameboard = (()=>{
    // let gridList = document.querySelectorAll('.grid');

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
    //create 2 players
    let player1 = player('Player 1','X');
    let player2 = player('Player 2','O');

    //create the board array
    let boardArray = gameboard.initialiseBoard();

    //let player1 take the 1st turn
    let whoseTurn = player1;

    //function to update the board
    
        gridList.forEach((grid,index)=>{//index rep the no. of the divs
            
            grid.addEventListener('click',() =>{
                let col = index % 3;
                let row = parseInt(index / 3);
                console.log(index);
                console.log(`col:${col}`);
                console.log(`row:${row}`);
                if(!grid.textContent){//if grid is empty, mark it
                
                    if(whoseTurn == player1){
                        //mark the array
                        boardArray[row][col] = player1.getMarking(); //rmb the (), w/o it i am calling a property
                        //transfer the array content to grid to mark it
                        grid.textContent = boardArray[row][col];
                        whoseTurn = player2;
                        console.log('player 1 fired;');
                    }else{
                        boardArray[row][col] = player2.getMarking();
                        grid.textContent = boardArray[row][col];
                        whoseTurn = player1;
                        console.log('player 2 fired');
                    }
                    const checkWin = ( ()=> { //check if winning condition is satisfied at every turn
                        //check for horizontal
                        if(boardArray[0][0] && boardArray[0][0]=== boardArray[0][1] && boardArray[0][2]=== boardArray[0][1] ||
                            boardArray[1][0] && boardArray[1][0]=== boardArray[1][1] && boardArray[1][2]=== boardArray[1][1] ||
                            boardArray[2][0] && boardArray[2][0]=== boardArray[2][1] && boardArray[2][2]=== boardArray[2][1]
                        ){
                            console.log('horizontal strike ! game over!')
                        }

                        //check for vertical
                        if(boardArray[0][0] && boardArray[0][0]=== boardArray[1][0] && boardArray[2][0]=== boardArray[1][0] ||
                            boardArray[0][1] && boardArray[0][1]=== boardArray[1][1] && boardArray[2][1]=== boardArray[1][1] ||
                            boardArray[0][2] && boardArray[0][2]=== boardArray[1][2] && boardArray[2][2]=== boardArray[1][2]
                        ){
                            console.log('Vertical strike ! game over!')
                        }

                        //2 diagonal strikes
                        if (boardArray[0][0] && boardArray[0][0]=== boardArray[1][1] && boardArray[2][2]=== boardArray[1][1] ||
                            boardArray[0][2] && boardArray[0][2]=== boardArray[1][1] && boardArray[2][0]=== boardArray[1][1]){
                                console.log('diagonal strike!')
                            }
                    
                    }) ();
                    
                }
            })
        })
    
    //function to restart the game when restart button clicked
    const restartGame = (() => {
        restartbtn = document.querySelector('.restart_button');
        restartbtn.addEventListener('click',() => {//clears the entire array
            console.log('restart!');
            whoseTurn = player1; //turn back to player1
            boardArray = gameboard.initialiseBoard();//renew the array
            //renew UI
            gridList.forEach(grid => {
                grid.textContent = '';
            });
        })
    }) ();
   
 })();
 
// gameController.markgrid();
 //creates a checkwin function that checks all the win conditions. Hardcode the win conditions
 let checkwin = () =>{
    
 
 }

 
 
 


