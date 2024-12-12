let gameBoard = (function(){
    let _gameBoard = ["", "", "", "", "", "", "", "", ""];
    /*DESTRUCTURE THE GAMEBOARD INTO ROWS
    let [a, b, c] = _gameBoard;
    let [d, e, f] = _gameBoard;
    let [g, h, i] = _gameBoard;
    [a, d, g] = _gameBoard;
    [b, e, h] = _gameBoard;
    [c, f, i] = _gameBoard;
    [a, e, i] = _gameBoard;
    [c, e, g] = _gameBoard;*/
    return {
        chooseCell: function(cell, token){
            return _gameBoard[cell] = token;
        },
        getGameBoard: function() {
            return _gameBoard;
        },
        getTopRow: function() {
            [a, b, c] = _gameBoard;
            return [a, b, c];
        },
        getMidRow: function() {
            [d, e, f] = _gameBoard;
            return [d, e, f];
        },
        getBtmRow: function() {
            [g, h, i] = _gameBoard;
            return [g, h, i];
        },
        getLftCol: function() {
            [a, d, g] = _gameBoard;
            return [a, d, g];
        },
        getMidCol: function() {
            [b, e, h] = _gameBoard;
            return [b, e, h];
        },
        getRgtCol: function() {
            [c, f, i] = _gameBoard;
            return [c, f, i];
        },
        getLftDiag: function() {
            [a, e, i] = _gameBoard;
            return [a, e, i];
        },
        getRgtDiag: function() {
            [c, e, g] = _gameBoard;
            return [c, e, g];
        },
    };
}());

// console.log(gameBoard.getGameBoard()); //returns array of empty strings
// console.log(gameBoard.chooseCell(4, 'o')); //returns 'o'
// console.log(gameBoard); //returns updated array
console.log(gameBoard.chooseCell(0, 'x'));
console.log(gameBoard.chooseCell(5, 'o'));
console.log(gameBoard.getTopRow());

let players = (function(){
    function createPlayer(name, token){
        return {player: name, token: token}
    }

    const _playerX = createPlayer("playerX", "X");
    const _playerO = createPlayer("playerO", "O");

    return {
        getPlayerX: function(){
            return _playerX;
        },
        getPlayerO: function(){
            return _playerO;
        },
    }
}());

// console.log(players.getPlayerX());
// console.log(players.getPlayerO());
// console.log(players);

let gameFlow = function(){
    let _whoseTurn = players.getPlayerX();
    console.log(_whoseTurn);
    let _gameOver = false;

    function takeTurn(){
        gameBoard.chooseCell(cell, token);
        (_whoseTurn === players.getPlayerX()) ? 
            _whoseTurn === players.getPlayerO() :
            _whoseTurn === players.getPlayerX();
    }
    // 3. gameBoard array
    //     TOP ROW: 0  1   2
    //     MID ROW: 3  4   5
    //     BTM ROW: 6  7   8

    function checkForMatches(array){
        
    }

    function checkWin(){
    // DEFINE checkForWin function
    // ACCESS gameBoard
    // IF (top row OR mid row OR btm row OR 
        gameBoard.getTopRow().forEach(cell) => {

        }
    //     left col OR mid col OR rgt col OR
    //     diag OR diag2) tokens match THEN
        
    //     SET gameOver to true
    //     RETURN winning player

    // ELSE IF all tokens have been placed AND no matches THEN
    //     SET gameOver to true
    //     RETURN tie
    // ELSE gameOver remains false
    // END checkForWin
    }

}

console.log(gameFlow());

/* ======================================================
                    PSEUDOCODE
=========================================================

#### HOW GAME SHOULD WORK ####
1. 3 x 3 grid
2. 2 x players
3. 2 x types of tokens (e.g. x and o)
4. player x places token in grid cell
5. player o places token in different grid cell
6. repeat steps 4-5 until either
    a. 3 x matching tokens in any row
        - declare game over
        - declare winner
    b. < 3 matching tokens in any row
        - declare game over
        - declare tie


**** CONSIDERATIONS ****
1. grid cell cannot be used more than once
2. randomise which player starts the round?
3. gameBoard array
        TOP ROW: 0  1   2
        MID ROW: 3  4   5
        BTM ROW: 6  7   8


___GAMEBOARD_OBJECT___
DECLARE gameBoard factory function IFFE
    SET gameBoard object
        SET gameBoard array as 8 x empty strings(??)
        RETURN gameBoard
    END gameBoard object
END gameBoard function


___PLAYER_OBJECT___
DECLARE players factory function IIFE
    SET playerOne object to playerOne
        SET player x
        SET token x
    END playerOne
    SET playerTwo object to playerTwo
        SET player o
        SET token o
    END playerTwo object
    RETURN playerOne and playerTwo
END players function


___GAME_FLOW_OBJECT___
DECLARE gameFlow function
    ACCESS gameBoard
    ACCESS playerOne and playerTwo
    DEFINE whoseTurn variable
    SET whoseTurn to playerOne
    DEFINE gameOver variable
    SET gameOver to false
    DEFINE takeTurn function (arrayChoice)
        ACCESS gameBoard
        ACCESS whoseTurn
        SET array item to token (arrayChoice)
        UPDATE whoseTurn to other player
    END takeTurn
    DEFINE checkForWin function
        ACCESS gameBoard
        IF (top row OR mid row OR btm row OR 
            left col OR mid col OR rgt col OR
            diag OR diag2) tokens match THEN
            SET gameOver to true
            RETURN winning player
        ELSE IF all tokens have been placed AND no matches THEN
            SET gameOver to true
            RETURN tie
        ELSE gameOver remains false
    END checkForWin
    DEFINE playRound function
        SEQUENCE
            INVOKE takeTurn
            INVOKE checkForWin
        END SEQUENCE
    END playRound
END gameFlow

*/