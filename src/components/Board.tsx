import type { BoardProps } from "boardgame.io/react"
import type React from "react"
import type { TicTacToeState } from "../game"

export const TicTacToeBoard: React.FC<BoardProps<TicTacToeState>> = ({
  G,
  ctx,
  moves,
}) => {
  const onClick = (id: number) => moves.clickCell(id)

  let winner = ""
  if (ctx.gameover) {
    winner =
      ctx.gameover.winner !== undefined ? (
        <div id="winner">Winner: {ctx.gameover.winner}</div>
      ) : (
        <div id="winner">Draw!</div>
      )
  }

  return (
    <div className="game-board">
      <div className="grid">
        {G.cells.map((cell, id) => (
          <div
            key={id}
            className={`cell ${cell ? "filled" : ""}`}
            onClick={() => onClick(id)}
          >
            {cell}
          </div>
        ))}
      </div>
      {winner && <div className="winner-msg">{winner}</div>}
      <div className="status">
        {!ctx.gameover && (
          <span className="current-player">
            Current Player: <strong>{ctx.currentPlayer}</strong>
          </span>
        )}
      </div>
    </div>
  )
}
