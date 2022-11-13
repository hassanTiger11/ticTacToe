
import React from "react"
import Square from './Square'
import "./index.css"

export default class Board extends React.Component {
    constructor(props){
      super(props)
      //keeps track of X and O's
      this.state = {
        squares: Array(9).fill(null),
        xIsNext: true,
        hasWinner: false,
        winnerSquares: Array(9).fill(null)
      }
    }
    calculateWinner(squares) {
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
    winnerSquares(squares) {
      console.log("winnerSquares: "+ squares);
      const winner = Array(9).fill(null);
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
          winner[a] = true;
          winner[b] = true;
          winner[c] = true;
          return winner;
        }
      }
      return Array(9).fill(false);
    }
    handleClick(i){
      //deep copy the whole Array
      const squares = this.state.squares.slice()
      if(this.calculateWinner(squares) || squares[i]){
        return;
      }
      squares[i] = this.state.xIsNext ? "X" : "O"
      this.setState({
        squares: squares,
        xIsNext: !this.state.xIsNext,
      });
      console.log("handleClick: "+ squares)
      const winner = this.winnerSquares(squares).slice();
      this.setState({
        winnerSquares: winner,
      });
    }
    renderSquare(i) {
      console.log("renderSquare: "+ this.state.winnerSquares)
      if (this.state.winnerSquares[i] === true){
  
        return <Square value={this.state.squares[i]}
        onClick= { ()=> this.handleClick(i)}
        style={{backgroundColor: 'green'}} />;
      }
      return <Square value={this.state.squares[i]}
      onClick= { ()=> this.handleClick(i)}/>;
    }
  
    render() {
      const winner = this.calculateWinner(this.state.squares);
  
      let status;
      if(winner){
        status = "Winner: " + winner
        this.hasWinner= true;
  
      }else{
        status = 'Next player: '+ (this.state.xIsNext ? "X": "O");
      }
      //const status = 'Next player: '+ (this.state.xIsNext ? "X": "O");
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  