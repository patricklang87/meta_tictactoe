import React from 'react';
import './Board.css';

export class Board extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.changeBoardColor = this.changeBoardColor.bind(this);
    }

    handleClick(e) {
        if (!this.props.isWinner) {
            let box = e.target;
            let boxNumber = parseInt(box.id);
            console.log("boxNumber: ", parseInt(box.id));
            if (this.props.boardState[boxNumber] == null) {
                if (this.props.xIsNext === true) {     
                    box.style.backgroundColor = "red";
                } else {
                    box.style.backgroundColor = "blue";
                }
                this.props.updateBoard(boxNumber); 
                this.changeBoardColor();
            }
        }
    }

    changeBoardColor() {
        let board = document.getElementsByClassName('Board')[0];
        console.log(board);
        if (this.props.xIsNext) board.style.background = "darkblue";
        else board.style.background = "firebrick";
    }


    renderBoard() {
        let nineSquare = [];
        for (let x = 0; x < 9; x++) {
            let key = `${x}tile`;
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