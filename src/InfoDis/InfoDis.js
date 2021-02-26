import React from 'react';
import './InfoDis.css';

export class InfoDis extends React.Component {

    render() {
        let message;
        if (this.props.winner) {
            if (this.props.winner === "tie game") {
                message = "TIE GAME!";
            } else {
                let player = this.props.winner.toUpperCase();
                message = `${player} has won!`;
            } 
        } else {
            let player = (this.props.xIsNext) ? 'RED' : 'BLUE';
            message = `It's ${player}'s turn!`;
        }
        
        return (
                <p>{message}</p>      
        );
    }
}