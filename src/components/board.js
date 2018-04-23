import React from "react";

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
        return <Square key={i}
                       value={this.props.squares[i]}
                       onClick={() => this.props.onClick(i)}
        />;
    }

    render() {
        const self =  this;
        const indexs = [0,1,2,3,4,5,6,7,8];
        const itens = indexs.map(function (index) {
            return  self.renderSquare(index);
        });

        return (
            <div className="game__board">
                {itens}
            </div>
        );
    }
}

export default Board;