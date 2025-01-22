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
    let _tileClaimed = false;
    let _tie = false;
    let _token;
    let _winner;

    function getToken(){
        if (_activePlayer === players.getPlayerX()) {
            return _token = 'x';
        } else (_activePlayer === players.getPlayerO())
            return _token = 'o';
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
       } else if (_matchingRow === true && _winner === players.getPlayerO()){
            _gameOver = true;
       } else if (_matchingRow === false){
            let emptyCell = gameBoard.getGameBoard().includes('');
            if (emptyCell === false){
                _gameOver = true;
                _tie = true;
            }
       } 
    }

    function takeTurn(cell){
        if (gameBoard.checkCell(cell) !== ''){
            return _tileClaimed = true;
        } else {
            getToken();
            gameBoard.chooseCell(cell, _token);
            checkForGameOver(); 
        }
        
        if (_gameOver === false){
            _activePlayer === players.getPlayerX() ? 
            _activePlayer = players.getPlayerO() :
            _activePlayer = players.getPlayerX();       
        }
    }

    function chooseStartingPlayer(){
        let num = Math.floor(Math.random() * 2);
        (num === 0) ? _activePlayer = players.getPlayerX() : _activePlayer = players.getPlayerO();
        return _activePlayer;
    }

    function startGame(){
        _activePlayer = '';
        _gameOver = false;
        _matchingRow = false;
        _message = '';
        _tie = false;
        _tileClaimed = '';
        _token = '';
        _winner = '';
        gameBoard.resetBoard();
        chooseStartingPlayer();
    }

    startGame();

    return {
        isGameOver: function(){
            return _gameOver;
        },
        isTie: function(){
            return _tie;
        },
        isWinner: function(){
            let winner;
            if (_winner === players.getPlayerX()){
                return winner = 'Player X';
            } else {
                return winner = 'Player O';
            }
        },
        startGame,
        takeTurn,
        getToken,
    };
}());

let screenController = (function(){
    let _activePlayerDisp = document.createElement('div');
    let _board = document.createElement('div');
    let _cells = [];
    let _messageDisp = document.createElement('div');
    let _page = document.querySelector('div');
    let _newGame = document.createElement('button')

    _newGame.textContent = 'New Game';
    _page.appendChild(_activePlayerDisp);
    _page.appendChild(_messageDisp);
    _page.appendChild(_newGame);
    _page.appendChild(_board);

    // Event Listeners
    _newGame.addEventListener('click', () => {
        gameController.startGame();
        for (let i = 0; i < _cells.length; i++){
            _cells[i].textContent = '';
        }
        _messageDisp.textContent = '';
        announceActivePlayer();
    });
    // END event listeners

    announceActivePlayer();
    createGameBoardDisp();

    function createGameBoardDisp(){
        for (let i = 0; i < gameBoard.getGameBoard().length; i++){
            _cells[i]= document.createElement('button');
            _cells[i].textContent = gameBoard.getGameBoard()[i];    
            _board.appendChild(_cells[i]);
        }
        
        for (let i = 0; i < _cells.length; i++){ //create grid buttons
            _cells[i].addEventListener('click', () => {
                gameController.takeTurn(i);
                _cells[i].textContent = gameBoard.getGameBoard()[i];
                announceActivePlayer();
                announceGameOver();
            });
        }
        return gameBoard.getGameBoard();
    }

    function announceActivePlayer(){
        console.log(gameController.getToken())
        if (gameController.isGameOver() === false){
            if (gameController.getToken() === 'x'){
                _activePlayerDisp.textContent = "it's Player X's turn";
            } else {
                _activePlayerDisp.textContent = "it's Player O's turn";
            }
        }
    }

    function announceGameOver(){
        if (gameController.isGameOver() === true){
            _messageDisp.textContent = 'GAME OVER';
            announceWinner();
        }
    }

    function announceWinner(){
        if (gameController.isTie() === true){
            _activePlayerDisp.textContent = `Womp womp, it's a tie...`;
        } else {
            _activePlayerDisp.textContent = `${gameController.isWinner()} wins!`;
        }   
    }
}());