//create gameboard obj
// store the gameboard in a 2d array inside of a gameboard Object
let gameboard =()=>{
    let board = [ //initial board
        ['','',''],
        ['','',''],
        ['','','']
    ]
 
 
    //function to initialise the board
    const initialiseBoard = () => board;
   
    //function to update the board
 
 
    //function to restart the game when restart button clicked
 
 
    //function to print out the board in the console for debugging purposes
 }
 
 
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
 
 
   
 
 
   
 })()
 
 
 //creates a checkwin function that checks all the win conditions. Hardcode the win conditions
 let checkwin = () =>{
 
 
 }
 
 
 //restarts the game
 


