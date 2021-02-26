import React from 'react';
import './Board.css';

export class Board extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.updateValidBoards = this.updateValidBoards.bind(this);
        this.updateBoardState = this.updateBoardState.bind(this);
        this.checkLocalWinner = this.checkLocalWinner.bind(this);
        this.checkForWinner = this.checkForWinner.bind(this);
        this.getBoardAndTileNumber = this.getBoardAndTileNumber.bind(this);
        this.markFinishedBoard = this.markFinishedBoard.bind(this);
        this.renderBoard = this.renderBoard.bind(this);
        this.checkForBlockedBoard = this.checkForBlockedBoard.bind(this);
        this.state = {  boardState: Array(9).fill(null),
                        /*localWinner: null*/ }
    }

    updateBoardState(tile, currentPlayer) {
        let currentBoard = this.state.boardState;
        currentBoard.splice(tile, 1, currentPlayer);
        this.setState({ boardState: currentBoard });
    } 

    checkForBlockedBoard() {
        let board = this.state.boardState;
        console.log(this.props.boardNumber, board);
        if (!board.includes(null)) {
            console.log("blockedBoard");
            this.props.addLocalWinner(this.props.boardNumber, "blockedBoard");
        }
    }
    
    checkLocalWinner() {
        let board = this.state.boardState;
        let winner = this.checkForWinner(board);
        if (winner) {
            console.log("There's a winner! ", this.props.boardNumber, winner);
            //this.setState({ localWinner : winner });
            this.props.addLocalWinner(this.props.boardNumber, winner);
            return;
        }
        this.checkForBlockedBoard();
    }
    
    markFinishedBoard(winner) {
        if ((winner) && (winner !== "blockedBoard")) {
            let winnerColor = (winner === "red") ? '#f30067' : '#00d1cd';
            let tiles = document.getElementsByClassName('tile');
            console.log(tiles);
            for (let tile of tiles) {
                console.log("tile.id: ", tile.id);
                if (Number(tile.id[0]) === Number(this.props.boardNumber)) tile.style.backgroundColor = winnerColor;
            }
        }
        
    }

    
    checkForWinner(board) {
        if ((board[0] === board[1] && board[0] === board[2] && board[0] != null) || 
            (board[0] === board[3] && board[0] === board[6] && board[0] != null) ||
            (board[0] === board[4] && board[0] === board[8] && board[0] != null) ||
            (board[1] === board[4] && board[1] === board[7] && board[1] != null) ||
            (board[2] === board[5] && board[2] === board[8] && board[2] != null) ||
            (board[3] === board[4] && board[4] === board[5] && board[3] != null) ||
            (board[6] === board[7] && board[6] === board[8] && board[6] != null) ||
            (board[2] === board[4] && board[2] === board[6] && board[2] != null)) {
            let winner = (this.props.xIsNext) ? 'red' : 'blue';
            return winner;
        } else if (!this.state.boardState.includes(null)) {
            let result = "blockedBoard";
            return result;
        } else {
            return false;
        }  
      }
    
    updateValidBoards(tileNumber, boardNumber, winner) {
        this.props.handleTurnUpdate(tileNumber, boardNumber, winner);
    }

    handleClick(e) {
        let tile = e.target;
        let [ boardNumber, tileNumber ] = this.getBoardAndTileNumber(tile); 
        if ((!this.props.isWinner) && this.state.boardState[tileNumber] == null && this.props.nextBoard.includes(boardNumber)) {
            let currentPlayer = (this.props.xIsNext) ? "red" : "blue";
            let backgroundColor = (currentPlayer === "red") ? '#f30067' : '#00d1cd'
            tile.style.backgroundColor = backgroundColor;    
            this.updateBoardState(tileNumber, currentPlayer);
            let winner = this.checkForWinner(this.state.boardState);   
            this.updateValidBoards(tileNumber, boardNumber, winner);
            this.markFinishedBoard(winner);
        }       
    }

    getBoardAndTileNumber(tile) {
        let tileCode = parseInt(tile.id);
        let boardNumber, tileNumber;
        if (tileCode.toString().length === 1) {
            boardNumber = 0;
            tileNumber = tileCode;
        } else if (tileCode.toString().length === 2) {
            boardNumber = parseInt(tileCode.toString()[0]);
            tileNumber = parseInt(tileCode.toString()[1]);
        }
        return [boardNumber, tileNumber];
    }

    renderBoard() {
        let nineSquare = [];
        for (let x = 0; x < 9; x++) {
            let key = `${this.props.boardNumber}${x}tile`;
            nineSquare.push(<div className="tile" id={key} key={key} onClick={this.handleClick} />);
        }
        return nineSquare;
    }

    render() {
        return (
                <div className="Board"  >
                    {this.renderBoard()}
                </div>     
        );
    }
}