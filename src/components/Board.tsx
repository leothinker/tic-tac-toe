import type { BoardProps } from "boardgame.io/react"
import React from "react"
import type { GameState } from "../logic/game"

interface TicTacToeBoardProps extends BoardProps<GameState> {}

class TicTacToeBoard extends React.Component<TicTacToeBoardProps> {
  onClick = (id: number) => {
    if (this.isCellActive(id)) {
      this.props.moves.clickCell(id)
    }
  }

  isCellActive(id: number) {
    if (!this.props.isActive) return false
    if (this.props.G.cells[id] !== null) return false
    return true
  }

  render() {
    const tbody = []
    for (let i = 0; i < 3; i++) {
      const cells = []
      for (let j = 0; j < 3; j++) {
        const id = 3 * i + j
        cells.push(
          <td
            key={id}
            className={this.isCellActive(id) ? "active" : ""}
            onClick={() => this.onClick(id)}
          >
            {this.props.G.cells[id] === "0" ? "X" : this.props.G.cells[id] === "1" ? "O" : ""}
          </td>,
        )
      }
      tbody.push(<tr key={i}>{cells}</tr>)
    }

    let winner = null
    if (this.props.ctx.gameover) {
      winner =
        this.props.ctx.gameover.winner !== undefined ? (
          <div id="winner">Winner: {this.props.ctx.gameover.winner === "0" ? "X" : "O"}</div>
        ) : (
          <div id="winner">Draw!</div>
        )
    }

    return (
      <div>
        <table id="board">
          <tbody>{tbody}</tbody>
        </table>
        {winner}
      </div>
    )
  }
}

export default TicTacToeBoard
