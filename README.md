# tic-tac-toe
## Descriptions
-A tic-tac-toe game using vanilla Javascript, CSS and HTML

### functions 

#### markGrid()
-selects the specific DOM using event.target where the event object created by addEventListener would be passed as the argument for this function
-order of events: 
1. javascript file loaded, all the functions(ie. checkWin()) defined,event handler for each grid added
2. User clicks-->grids marked and eventlistener for that grid is removed, and condition for checkWin is accessed