import React from 'react';
import './App.css';
import { MetaBoard } from '../MetaBoard/MetaBoard.js';
import { InfoDis } from '../InfoDis/InfoDis';

export const palettes = [{
  background: '#444444',
  player1: '#f30067',
  player2: '#00d1cd',
  text: '#eaeaea'
}];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.togglePlayer = this.togglePlayer.bind(this);
    this.updateGameState = this.updateGameState.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.changeBoardColor = this.changeBoardColor.bind(this);
    this.checkForGameWinner = this.checkForGameWinner.bind(this);
    this.defineNextBoard = this.defineNextBoard.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.state = {
      gameState: Array(9).fill(null),
      xIsNext: true,
      nextPlayBoard: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      winner: null
    };
  }

  resetGame() {
    this.setState({ gameState: Array(9).fill(null),
      xIsNext: true,
      nextPlayBoard: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      winner: null });
      let boards = document.getElementsByClassName('Board');
      let tiles = document.getElementsByClassName('tile');
      let body = document.getElementsByTagName('body')[0];
      for (let board of boards) board.style.background = palettes[0].player1;
      for (let tile of tiles) tile.style.background = palettes[0].background;
      body.style.background = palettes[0].background;
  }

  
  checkForGameWinner() {
    let board = this.state.gameState;
    if ((board[0] === board[1] && board[0] === board[2] && board[0] != null) || 
        (board[0] === board[3] && board[0] === board[6] && board[0] != null) ||
        (board[0] === board[4] && board[0] === board[8] && board[0] != null) ||
        (board[1] === board[4] && board[1] === board[7] && board[1] != null) ||
        (board[2] === board[5] && board[2] === board[8] && board[2] != null) ||
        (board[3] === board[4] && board[4] === board[5] && board[3] != null) ||
        (board[6] === board[7] && board[6] === board[8] && board[6] != null) ||
        (board[2] === board[4] && board[2] === board[6] && board[2] != null)) {
        let winner = (this.state.xIsNext) ? 'player1' : 'player2';
        this.setState({ winner: winner });
        document.getElementsByTagName('body')[0].style.background = palettes[0].winner;
        return winner;
    } else {
        return false;
    }   
  }
  

  

  updateGameState(board, localWinner) {
    let gameState = this.state.gameState;
    if (localWinner) gameState.splice(board, 1, localWinner);
    return gameState;
  }

  defineNextBoard(boardNumber) {
    console.log("boardNumber: ", boardNumber);
    let nextBoard = [];
    if (this.state.gameState[boardNumber] == null) nextBoard.push(boardNumber);
    else {
      for (let x in this.state.gameState) {
        if (this.state.gameState[x] == null) nextBoard.push(Number(x));
      }
    } 
    this.changeBoardColor(nextBoard);
    return nextBoard;
  }

  changeBoardColor(nextBoard) {
    let boards = document.getElementsByClassName('Board');
    let nextColor = (this.state.xIsNext) ? "#00d1cd" : "#f30067";
    for (let x =0; x < 9; x++) {   
        if (nextBoard.includes(x)) boards[x].style.background = nextColor; 
        else boards[x].style.background = "#d8c292";
    }    
 }

  togglePlayer() {
    let xIsNext = (this.state.xIsNext) ? false : true;
    return xIsNext;
  }

  handleClick(tileNumber, boardNumber, winner) {
    this.setState({ gameState: this.updateGameState(boardNumber, winner), 
                    nextPlayBoard: this.defineNextBoard(tileNumber),
                    xIsNext: this.togglePlayer()});
    this.checkForGameWinner();
  }



  render() {
    return (
      <div>
        <h1>MetaTicTacToe</h1>
        <div id="gameSpace">
          <InfoDis xIsNext={this.state.xIsNext} winner={this.state.winner} resetGame={this.resetGame} />
          <MetaBoard gameState={this.state.gameState} checkForWinner={this.checkForWinner} xIsNext={this.state.xIsNext} handleTurnUpdate={this.handleClick} nextPlayBoard={this.state.nextPlayBoard} isWinner={this.state.winner} addLocalWinner={this.addLocalWinner} />
        </div>
        <button onClick={this.resetGame}>Reset</button>
      </div>
    );     
  }
}



export default App;
