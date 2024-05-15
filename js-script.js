//create gameboard obj
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
        let grids = Array.from(gridList); // Convert NodeList to 1D array

        board.forEach((row,rowIndex)=>{//for each row
            row.forEach((cell, cellIndex) =>{//for each array item in each row
                //print the item in the array onto the grid 
                let gridIndex = rowIndex *3 +cellIndex;
                grids[gridIndex].textContent = cell;
            })
        })
    }
    return {initialiseBoard,printGame};
 }) ();
 
 gameboard.printGame();
 
 //create 2 player objs using factory function(can be reused)
 let player = (name,marking) =>{//it is ok to include eventlistener as that is when we create the player from the factory function
   
    const getName = () => name;
    const getMarking = () => marking;
 
 
    return {getName,getMarking}
 }
 
 
 player();
 //create a gamecontroller object to control the game using all the conditionals!
 let gameController = (() =>{
    //create a function that designates the users and changes the users in every turn using conditionals
        //user marks the board
 
 
   
 
 
   
 })();
 
 
 //creates a checkwin function that checks all the win conditions. Hardcode the win conditions
 let checkwin = () =>{
 
 
 }
 
 
 //function to restart the game when restart button clicked
 const restartGame = (() => {
    restartbtn = document.querySelector('.restart_button');
    restartbtn.addEventListener('click',() => {
        //receives the entire array and clears the items
    })
}) 


