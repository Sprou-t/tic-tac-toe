//create gameboard obj
// store the gameboard in a 2d array inside of a gameboard Object
let gameboard =( ()=>{
    let board = [
        ['','',''],
        ['','',''],
        ['','','']
    ]
    console.log(board);

    function getBoard() {//this function is important as we can also implement validation with conditionals
        return board;
      }

      return {getboard}; //using {} to return properties of an object
}) (); 

//create a player obj
let player = () =>{

}

//create a gamecontroller object to control the game!



