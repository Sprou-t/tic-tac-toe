//create gameboard obj
// store the gameboard in a 2d array inside of a gameboard Object
let gameboard =( ()=>{
    let board = [ //initial board
        ['','',''],
        ['','',''],
        ['','','']
    ]

    //update the status of the board, deleting the previous version
    function getBoard() {//this function is important as we can also implement validation with conditionals
        return board;
      }

      return {getboard}; //using {} to return properties of an object
}) 

//create a player obj
let player = () =>{
    let player1;
    let player2;
    nameButton = document.querySelector('.name_submit');
    nameButton.addEventListener('click',(event)=>{
        event.preventDefault();
        player1 = document.querySelector('.input_player1').value;
        player2 = document.querySelector('.input_player2').value;
        console.log(player1);
    })

    //addmarker for each player
}

player();
//create a gamecontroller object to control the game!
let gameController = () =>{

}

//Write a function that will render the contents of the gameboard array to the webpage 

//Write the functions that allow players to add marks to a specific spot on the board by interacting with the appropriate DOM elements 


