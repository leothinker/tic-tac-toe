import type { BoardProps } from "boardgame.io/react"
import React from "react"
import type { GameState } from "../logic/game"

interface TicTacToeBoardProps extends BoardProps<GameState> {}

const XSymbol = ({ className = "symbol-svg" }) => (
  <svg className={className} viewBox="0 0 100 100">
    <line x1="22" y1="22" x2="78" y2="78" className="x-stroke x-stroke-1" />
    <line x1="78" y1="22" x2="22" y2="78" className="x-stroke x-stroke-1 x-stroke-2" />
  </svg>
)

const OSymbol = ({ className = "symbol-svg" }) => (
  <svg className={className} viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="38" className="o-stroke" />
  </svg>
)

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

  getWinningLineCoords(line: number[]) {
    const map: Record<string, { x1: string; y1: string; x2: string; y2: string }> = {
      "0,1,2": { x1: "0%", y1: "16.6%", x2: "100%", y2: "16.6%" },
      "3,4,5": { x1: "0%", y1: "50%", x2: "100%", y2: "50%" },
      "6,7,8": { x1: "0%", y1: "83.3%", x2: "100%", y2: "83.3%" },
      "0,3,6": { x1: "16.6%", y1: "0%", x2: "16.6%", y2: "100%" },
      "1,4,7": { x1: "50%", y1: "0%", x2: "50%", y2: "100%" },
      "2,5,8": { x1: "83.3%", y1: "0%", x2: "83.3%", y2: "100%" },
      "0,4,8": { x1: "0%", y1: "0%", x2: "100%", y2: "100%" },
      "2,4,6": { x1: "100%", y1: "0%", x2: "0%", y2: "100%" },
    }
    return map[line.join(",")] || { x1: "0", y1: "0", x2: "0", y2: "0" }
  }

  render() {
    const { G, ctx, reset } = this.props
    const winner = ctx.gameover?.winner
    const isDraw = ctx.gameover?.draw
    const winLine = ctx.gameover?.line || []

    const cells = G.cells.map((cellValue, id) => (
      <div
        key={id}
        className={`cell ${this.isCellActive(id) ? "active" : ""}`}
        onClick={() => this.onClick(id)}
      >
        {cellValue === "0" && <XSymbol />}
        {cellValue === "1" && <OSymbol />}
      </div>
    ))

    let winningLineSVG = null
    if (winner !== undefined && winLine.length > 0) {
      const coords = this.getWinningLineCoords(winLine)
      winningLineSVG = (
        <svg className="strike-overlay">
          <line 
            x1={coords.x1} y1={coords.y1} 
            x2={coords.x2} y2={coords.y2} 
            className={`strike-path ${winner === "0" ? "x-win" : "o-win"}`} 
          />
        </svg>
      )
    }

    const boardHiddenClass = winner !== undefined ? "hidden-win" : isDraw ? "hidden-draw" : ""
    const resultActiveClass = winner !== undefined ? "active-win" : isDraw ? "active-draw" : ""

    // 状态栏文字：轮到谁或是游戏结束
    let statusBarText = ""
    if (ctx.gameover) {
      statusBarText = isDraw ? "Draw!" : winner === "0" ? "X Wins!" : "O Wins!"
    } else {
      statusBarText = `${ctx.currentPlayer === "0" ? "X" : "O"}'s Turn`
    }

    return (
      <div className="game-container">
        {/* 1. 顶部状态栏 */}
        <div className="status-bar">
          <div className="status-text">{statusBarText}</div>
        </div>

        {/* 2. 中部游戏区 */}
        <div className="game-area">
          {/* 棋盘层 */}
          <div className={`board-wrapper ${boardHiddenClass}`}>
            <div className="board">
              {cells}
            </div>
            {winningLineSVG}
          </div>

          {/* 结算图层 */}
          <div className={`result-view ${resultActiveClass}`}>
            {winner === "0" && <XSymbol className="big-symbol" />}
            {winner === "1" && <OSymbol className="big-symbol" />}
            {isDraw && (
              <div className="draw-symbols">
                <XSymbol className="big-symbol" />
                <OSymbol className="big-symbol" />
              </div>
            )}
          </div>
        </div>

        {/* 3. 底部操作栏 */}
        <div className="footer">
          <button className="restart-btn" onClick={() => reset()}>
            Restart Game
          </button>
        </div>
      </div>
    )
  }
}

export default TicTacToeBoard
