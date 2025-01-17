let gameBoard = (function(){
    // let _gameBoard = ["", "", "", "", "", "", "", "", ""];
    let _gameBoard = ["x", "o", "x", "o", "x", "o", "", "", ""];
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
            return _activePlayer = "It's Player X's turn";
        } else {
            _token = 'o';
            return _activePlayer = "It's Player O's turn";
        };
    }

    function announceGameOver(_gameOver){
        if (_gameOver === true){
            return _gameOver = 'GAME OVER';
        }
    }

    function announceWinner(_winner){
        if (_winner === players.getPlayerX()){
            return _winner = `Player X wins!`
        } else 
            return _winner = `Player O wins!`;
    }

    function announceTie(_tie){
        return _tie = `Oh cool, a tie`;
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
            announceGameOver(_gameOver);
            announceWinner(_winner);
       } else if (_matchingRow === true && _winner === players.getPlayerO()){
            _gameOver = true;
            announceGameOver(_gameOver);
            announceActivePlayer(_winner);
       } else if (_matchingRow === false){
            let emptyCell = gameBoard.getGameBoard().includes('');
            if (emptyCell === false){
                _gameOver = true;
                _tie = true;
                announceGameOver(_gameOver);
                announceTie(_tie);
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
        announceActivePlayer,
        announceGameOver,
        announceTie,
        startGame,
        takeTurn,
        checkForGameOver,
    };
}());

let screenController = (function(){
    let _activePlayerDisp = document.createElement('div');
    let _board = document.createElement('div');
    let _cells = [];
    let _messageDisp = document.createElement('div');
    let _page = document.querySelector('body');
    let _newGame = document.createElement('button')


    _newGame.textContent = 'New Game';
    _newGame.addEventListener('click', () => gameController.startGame());

    _page.appendChild(_activePlayerDisp);
    _page.appendChild(_messageDisp);
    _page.appendChild(_newGame);
    _page.appendChild(_board);

    updateActivePlayerDisp();

    function updateActivePlayerDisp(){
        _activePlayerDisp.textContent = gameController.announceActivePlayer();
    }

    function createGameBoardDisp(){
        for (i = 0; i < gameBoard.getGameBoard().length; i++){
            _cells[i]= document.createElement('button');
            _cells[i].textContent = gameBoard.getGameBoard()[i];    
            
            
            // last
            _board.appendChild(_cells[i]);
        }
        return gameBoard.getGameBoard();
    }
    createGameBoardDisp();

    for (i = 0; i < _cells.length; i++){
        _cells[i].addEventListener('click', () => {

            // this always passes i=9
            gameController.takeTurn(i);
            _cells[i].textContent = gameBoard.getGameBoard()[i];
            updateActivePlayerDisp();
            
        });
    }

    function updateGameBoardDisp(){

    }



    function updateMessageDisp(){

    }
    
}());

/* ======================================================
                    TESTING CENTRE
=========================================================
What things do I need to be able to see?
1. gameBoard
    div
2. buttons in gameBoard
    array loop to create buttons
3. who's turn it is
    div or p
4. winner announcement
    div or p
5. button to restart game

*/