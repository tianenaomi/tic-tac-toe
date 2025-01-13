let gameBoard = (function(){
    // let _gameBoard = ["", "", "", "", "", "", "", "", ""];
    let _gameBoard = ["x", "o", "x", "o", "x", "o", "", "o", ""]; //test
    /*DESTRUCTURE THE GAMEBOARD INTO ROWS
    let [a1, b2, c2] = _gameBoard;
    let [d3, e4, f5] = _gameBoard;
    let [g6, h7, i8] = _gameBoard;
    [a, d, g] = _gameBoard;
    [b, e, h] = _gameBoard;
    [c, f, i] = _gameBoard;
    [a, e, i] = _gameBoard;
    [c, e, g] = _gameBoard;*/
    return {
        checkCell: function(cell){
            return _gameBoard[cell];
        },
        chooseCell: function(cell, token){ //claimCell instead?
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
        resetBoard: function() {
            return _gameBoard = ["", "", "", "", "", "", "", "", ""];
        }
    };
}());

let players = (function(){
    function createPlayer(name, token){
        return {player: name, token: token}
    }
    const _playerX = createPlayer("playerX", "x");
    const _playerO = createPlayer("playerO", "o");
    return {
        getPlayerX: function(){
            return _playerX;
        },
        getPlayerO: function(){
            return _playerO;
        },
    }
}());

let gameController = (function(){
    let _activePlayer;
    let _gameOver = false;
    let _matchingRow = false;
    let _winner;
    let _tie = false;
    let _token;

    function announceActivePlayer(){
        if (_activePlayer === players.getPlayerX()) {
            _token = 'x';
            console.log("It's Player X's turn");
        } else {
            _token = 'o';
            console.log("It's Player O's turn");
        };
    }

    function announceGameOver(_winner, _tie){
        console.log('GAME OVER');
        if (_tie === true) {
            console.log(`Oh cool, a tie`);
        } else {
            console.log(`${_winner} wins!`);
        }
    }

    function checkForMatches(array){
        if (array[0] !== '' 
            && array[0] === array[1] 
            && array[0] === array[2]) {
            _matchingRow = true;
        }
        if (_matchingRow === true && array[0] === 'x'){ // can these two if statements be condensed by referring to the player token instead of explicitly stating the tokens over two statements?
            _winner = players.getPlayerX();
        } else if (_matchingRow === true && array[0] === 'o'){
            _winner = players.getPlayerO();
        }
        return _matchingRow;
    }

    function checkForGameOver(){
       if (_matchingRow === false){
            checkForMatches(gameBoard.getTopRow());
            checkForMatches(gameBoard.getMidRow());
            checkForMatches(gameBoard.getBtmRow());
            checkForMatches(gameBoard.getLftCol());
            checkForMatches(gameBoard.getMidCol());
            checkForMatches(gameBoard.getRgtCol());
            checkForMatches(gameBoard.getLftDiag());
            checkForMatches(gameBoard.getRgtDiag());
            for (let i = 0; i < gameBoard.getGameBoard.length; i++){
                if (gameBoard.getGameBoard[i] === '') {
                    break;
                } else {
                    _gameOver = true;
                    _tie = true;
                }
            }
       }

       if (_matchingRow === true && _winner === players.getPlayerX()){
            _gameOver = true;
            announceGameOver(_winner);
       } else if (_matchingRow === true && _winner === players.getPlayerO()){
            _gameOver = true;
            announceGameOver(_winner);
       } 
    //    else if (_matchingRow === false){
    //     // TO DO - this isn't working 
    //         gameBoard.getGameBoard().filter((item) => {
    //             if (gameBoard.getGameBoard()[item] === ''){
    //                 _gameOver = false;
    //             }
    //             return _gameOver;
    //         });
    //    } 
       return {_winner, _gameOver}; //check this
    }

    // // takeTurn() first draft
    function takeTurn(cell){
        if (gameBoard.checkCell(cell) !== ''){
            console.log('choose another tile');
        } else {
            gameBoard.chooseCell(cell, _token);
            _activePlayer === players.getPlayerX() ? 
                _activePlayer = players.getPlayerO() :
                _activePlayer = players.getPlayerX();
            checkForGameOver();
            
        }
        console.log(gameBoard.getGameBoard());
        if (_gameOver === false) announceActivePlayer();
    }

    

    // function takeTurn(cell, _activePlayer){
    //     // reworked to pass _activePlayer instead of token2
    //     if (gameBoard.checkCell(cell) !== ''){
    //         console.log('choose another tile');
    //     } else {
    //         if (_activePlayer === players.getPlayerX()){
    //             gameBoard.chooseCell(cell, 'x');
    //             _activePlayer = players.getPlayerO(); 
    //         } else {
    //             gameBoard.chooseCell(cell, 'o');
    //             _activePlayer = players.getPlayerX();
    //         }
    //         checkForGameOver();
    //     }
    //     console.log(_activePlayer);
    //     console.log(gameBoard.getGameBoard());
    // }

    function chooseStartingPlayer(){
        let num = Math.floor(Math.random() * 2);
        (num === 0) ? _activePlayer = players.getPlayerX() : _activePlayer = players.getPlayerO();
        return _activePlayer;
    }

    // working code
    function startGame(){
        gameBoard.resetBoard();
        chooseStartingPlayer();
        announceActivePlayer();
        // takeTurn();
    }

    return {
        startGame,
        takeTurn,
        checkForGameOver,
    };
}());

console.log(gameController.startGame());

// [0, 1, 2]
// [3, 4, 5]
// [6, 7, 8]


/* ======================================================
                    TESTING CENTRE
=========================================================
*/
    


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
4. create an option to play with computer which generates random cell selections?


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


___GAME_CONTROLLER_OBJECT___
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
    DEFINE checkForGameOver function
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
    END checkForGameOver
    DEFINE playRound function
        SEQUENCE
            INVOKE takeTurn
            INVOKE checkForGameOver
        END SEQUENCE
    END playRound
END gameFlow
*/