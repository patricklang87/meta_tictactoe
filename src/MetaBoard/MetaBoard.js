import React from 'react';
import './MetaBoard.css';
import { Board } from '../Board/Board';

export class MetaBoard extends React.Component {
    
    render() {
        let metaBoard = [];
        for (let x = 0; x < 9; x++) {
            let key = `${x}board`;
            metaBoard.push(<Board key={key} boardNumber={x} gameState={this.props.gameState} xIsNext={this.props.xIsNext} checkForWinner={this.props.checkForWinner} isWinner={this.props.winner} handleTurnUpdate={this.props.handleTurnUpdate} nextBoard={this.props.nextPlayBoard} addLocalWinner={this.props.addLocalWinner} />);
        }

        return (
                <div className="metaBoard">
                    {metaBoard}
                </div>
        );
    }
}