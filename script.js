let gameBoard = (function(){
    let _gameBoard = ["", "", "", "", "", "", "", "", ""];
    return {
        checkCell: function(cell){
            return _gameBoard[cell];
        },
        chooseCell: function(cell, token){
            return _gameBoard[cell] = token;
        },
        getGameBoard: function() {
            return _gameBoard;
        },
        getTopRow: function() {
            let [a, b, c] = _gameBoard;
            return [a, b, c];
        },
        getMidRow: function() {
            let [,,,d, e, f] = _gameBoard;
            return [d, e, f];
        },
        getBtmRow: function() {
            let [,,,,,,g, h, i] = _gameBoard;
            return [g, h, i];
        },
        getLftCol: function() {
            let [a,,, d,,, g] = _gameBoard;
            return [a, d, g];
        },
        getMidCol: function() {
            let [,b,,, e,,, h] = _gameBoard;
            return [b, e, h];
        },
        getRgtCol: function() {
            let [,,c,,, f,,, i] = _gameBoard;
            return [c, f, i];
        },
        getLftDiag: function() {
            let [a,,,, e,,,, i] = _gameBoard;
            return [a, e, i];
        },
        getRgtDiag: function() {
            let [,,c,, e,, g] = _gameBoard;
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
    let _tie = false;
    let _token;
    let _winner;

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
            (_winner === players.getPlayerX()) ?
                console.log(`Player X wins!`) :
                console.log(`Player O wins!`)
        }
    }

    function checkForMatches(array){
        if (array[0] !== '' 
            && array[0] === array[1] 
            && array[0] === array[2]) {
            _matchingRow = true;
        }
        if (_matchingRow === true && array[0] === 'x'){
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
       }

       if (_matchingRow === true && _winner === players.getPlayerX()){
            _gameOver = true;
            announceGameOver(_winner, _tie);
       } else if (_matchingRow === true && _winner === players.getPlayerO()){
            _gameOver = true;
            announceGameOver(_winner, _tie);
       } else if (_matchingRow === false){
            let emptyCell = gameBoard.getGameBoard().includes('');
            if (emptyCell === false){
                _gameOver = true;
                _tie = true;
                announceGameOver(_winner, _tie);
            }
       } 
    }

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

    function chooseStartingPlayer(){
        let num = Math.floor(Math.random() * 2);
        (num === 0) ? _activePlayer = players.getPlayerX() : _activePlayer = players.getPlayerO();
        return _activePlayer;
    }

    function startGame(){
        gameBoard.resetBoard();
        console.log(gameBoard.getGameBoard());
        chooseStartingPlayer();
        announceActivePlayer();
    }

    startGame();

    return {
        startGame,
        takeTurn,
        checkForGameOver,
    };
}());

/* ======================================================
                    TESTING CENTRE
=========================================================

*/