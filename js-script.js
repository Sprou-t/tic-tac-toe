//global variable


//create gameboard obj using IIFE as we only need to create 1 obj
// store the gameboard in a 2d array inside of a gameboard Object
let gameboard = (()=>{
    let board = [ //initial board
        ['X','',''],
        ['','',''],
        ['','','']
    ]
 
 
    //function to initialise the board
    const initialiseBoard = () => board;
   
    //function to update the board
 
    //function to print out the board in the console for debugging purposes
        //select all the divs first
    const printGame = () => {
        let gridList = document.querySelectorAll('.grid');
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

    //let player1 take the 1st turn
    let whoseTurn = player1;

    let eventDelegatorForGrid = document.querySelector('.gameboard');

    //create a function that marks the board w user's marker & changes the users in every turn using conditionals
    const markgrid = () =>{
        eventDelegatorForGrid.addEventListener('click',(e)=>{
            if(e.target.classList.contains('grid')){ 
                //change the player's turn
                if(whoseTurn == player1){
                    //mark the grid
                    e.target.textContent = player1.getMarking();//rmb the (), w/o it i am calling a property
                    whoseTurn = player2;
                    console.log('1 fired;');
                }
                
                else{
                    e.target.textContent = player2.getMarking();
                    whoseTurn = player1;
                    console.log('2 fired');
                }    
            }
        })
     }
    
    return {markgrid};
   
 })();
 
gameController.markgrid();
 //creates a checkwin function that checks all the win conditions. Hardcode the win conditions
 let checkwin = () =>{
 
 
 }
 
 
 //function to restart the game when restart button clicked
 const restartGame = (() => {
    restartbtn = document.querySelector('.restart_button');
    restartbtn.addEventListener('click',() => {//clears the entire array
        gameboard.initialiseBoard(); //won't work for now until i update the board obj
    })
}) ();


