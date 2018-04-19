import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

const _moveIndex = 9;

function Square(props) {
    return (
        <button className="game__board__square"
                onClick={() => props.onClick() }>
            {props.value}
        </button>
    );
}


class Board extends React.Component {

    renderSquare(i) {
        return <Square
                    value={this.props.squares[i]}
                    onClick={() => this.props.onClick(i)}
                />;
    }

    render() {
        return (
            <div className="game__board">
                {this.renderSquare(0)}
                {this.renderSquare(1)}
                {this.renderSquare(2)}
                {this.renderSquare(3)}
                {this.renderSquare(4)}
                {this.renderSquare(5)}
                {this.renderSquare(6)}
                {this.renderSquare(7)}
                {this.renderSquare(8)}
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(10).fill(null),
            }],
            xIsNext: true,
            stepNumber: 0,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        squares[_moveIndex] = i;
        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = this.historyButtonDescription(move, step);
            return (
                <li key={move} className="game__history__item">
                    <button onClick={() => this.jumpTo(move)}
                        className="game__history__item__button">{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <Board
                    squares={current.squares}
                    onClick={(i) => this.handleClick(i)}
                />
                <div className="game__info">
                    <div className="game__status">{status}</div>
                    <ul className="game__history">{moves}</ul>
                </div>
            </div>
        );
    }

    historyButtonDescription(move, step) {
        var description = 'Go to game start';

        if(move){
            const i = step.squares[_moveIndex];
            const y = i % 3;
            const x = Math.trunc(i/3);

            const position =  "(" + (x + 1) + ", " + (y + 1) + ")";
            const player = (move % 2 === 1) ? 'X' : 'O' ;

            description = 'Go to move #' + move + ' ' + player + ' ' + position;
        }

        return description;
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

