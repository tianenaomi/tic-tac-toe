
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