import React from 'react';
import './App.css';
import { Board } from '../Board/Board';
import { InfoDis } from '../InfoDis/InfoDis';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.updateBoard = this.updateBoard.bind(this);
    this.state = {
      boardState: Array(9).fill(null),
      xIsNext: true,
      winner: null
    };
  }

  checkForWinner() {
    const board = this.state.boardState;
    if ((board[0] === board[1] && board[0] === board[2] && board[0] != null) || 
        (board[0] === board[3] && board[0] === board[6] && board[0] != null) ||
        (board[0] === board[4] && board[0] === board[8] && board[0] != null) ||
        (board[1] === board[4] && board[1] === board[7] && board[1] != null) ||
        (board[2] === board[5] && board[2] === board[8] && board[2] != null) ||
        (board[3] === board[4] && board[4] === board[5] && board[3] != null) ||
        (board[6] === board[7] && board[6] === board[8] && board[6] != null) ||
        (board[2] === board[4] && board[2] === board[6] && board[2] != null)) {
        this.setState({ winner: (this.state.xIsNext) ? 'RED' : 'BLUE' });
        return true;
        } else {
          return false;
        }
      
  }

  

  updateBoard(position) {
      let stateAr = this.state.boardState;
      let playerValue = (this.state.xIsNext) ? "X" : "O";
      stateAr.splice(position, 1, playerValue);
      this.setState({ boardState: stateAr});
      let isAWinner = this.checkForWinner();
      if (isAWinner) {
        /*
        let body = document.getElementsByTagName('BODY')[0];
        if (this.state.winner == "RED") body.style.backgroundColor = "darkblue";
        else body.style.backgroundColor = "firebrick";
        */
        return;
    }
    this.setState({ xIsNext: (this.state.xIsNext) ? false : true });   
  }

  render() {
    return (
      <div>
        <InfoDis xIsNext={this.state.xIsNext} winner={this.state.winner} />
        <Board boardState={this.state.boardState} updateBoard={this.updateBoard} xIsNext={this.state.xIsNext} isWinner={this.state.winner} />
      </div>
    );     
  }
}



export default App;
