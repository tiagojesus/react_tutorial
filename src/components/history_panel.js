import React from "react";
import Consts from "../consts";

class HistoryPanel extends React.Component {
    static historyButtonDescription(move, step) {
        var description = 'Go to game start';

        if(move){
            const i = step.squares[Consts.moveIndex];
            const y = i % 3;
            const x = Math.trunc(i/3);

            const position =  "(" + (x + 1) + ", " + (y + 1) + ")";
            const player = (move % 2 === 1) ? 'X' : 'O' ;

            description = 'Go to move #' + move + ' ' + player + ' ' + position;
        }

        return description;
    }

    render(){
        const history = this.props.history

        const moves = history.map((step, move) => {
            const desc = HistoryPanel.historyButtonDescription(move, step);
            var className = 'game__history__item__button ';
            if(this.props.stepNumber === move) {
                className = className + 'game__history__item__button--current';
            }

            return (
                <li key={move} className="game__history__item">
                    <button onClick={() => this.props.onClick(move)}
                            className={className}>{desc}</button>
                </li>
            );
        });

        return <ul className="game__history">{moves}</ul>;
    }
}

export default HistoryPanel;