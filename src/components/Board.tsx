import type { BoardProps } from "boardgame.io/react"
import type React from "react"
import { Button } from "@/components/ui/button"
import type { GameState } from "../logic/game"

interface TicTacToeBoardProps extends BoardProps<GameState> {}

/** SVG Symbol: X */
const XSymbol = ({ className = "w-[75%] h-[75%]" }) => (
  <svg className={className} viewBox="0 0 100 100">
    <line x1="22" y1="22" x2="78" y2="78" className="x-stroke" />
    <line x1="78" y1="22" x2="22" y2="78" className="x-stroke x-stroke-2" />
  </svg>
)

/** SVG Symbol: O */
const OSymbol = ({ className = "w-[75%] h-[75%]" }) => (
  <svg className={className} viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="38" className="o-stroke" />
  </svg>
)

const TicTacToeBoard: React.FC<TicTacToeBoardProps> = ({
  G,
  ctx,
  moves,
  reset,
  isActive,
}) => {
  const winner = ctx.gameover?.winner
  const isDraw = ctx.gameover?.draw
  const winLine = ctx.gameover?.line || []

  const isCellActive = (id: number) => isActive && G.cells[id] === null

  /** Calculate winning line coordinates for SVG strike */
  const getLineCoords = (line: number[]) => {
    const map: Record<
      string,
      { x1: string; y1: string; x2: string; y2: string }
    > = {
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

  /** Render Grid Cells */
  const cells = G.cells.map((cellValue, id) => (
    <div
      key={id}
      className={`cell relative flex items-center justify-center ${
        isCellActive(id) ? "cursor-pointer hover:bg-white/5" : "cursor-default"
      }`}
      onClick={() => isCellActive(id) && moves.clickCell(id)}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {cellValue === "0" && <XSymbol />}
        {cellValue === "1" && <OSymbol />}
      </div>
    </div>
  ))

  const boardHidden =
    winner !== undefined
      ? "delay-[1.2s] opacity-0 pointer-events-none"
      : isDraw
        ? "delay-[0.6s] opacity-0 pointer-events-none"
        : "opacity-100"
  const resultActive =
    winner !== undefined
      ? "delay-[1.4s] scale-100 opacity-100 pointer-events-auto"
      : isDraw
        ? "delay-[0.8s] scale-100 opacity-100 pointer-events-auto"
        : "scale-75 opacity-0 pointer-events-none"
  const statusBarText = ctx.gameover
    ? isDraw
      ? "Draw!"
      : `${winner === "0" ? "X" : "O"} Wins!`
    : `${ctx.currentPlayer === "0" ? "X" : "O"}'s Turn`

  return (
    <div className="flex flex-col items-center justify-between w-full h-screen max-h-[900px] py-12 px-6 mx-auto select-none overflow-hidden font-sans text-white">
      {/* Turn Indicator / Game Result */}
      <div className="h-[100px] flex items-center justify-center">
        <div className="text-5xl min-[500px]:text-6xl font-black uppercase tracking-widest text-center leading-none">
          {statusBarText}
        </div>
      </div>

      {/* Main Game Board and Result Layers */}
      <div className="relative w-[320px] h-[320px] min-[500px]:w-[480px] min-[500px]:h-[480px] flex items-center justify-center shrink-0">
        <div
          className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${boardHidden}`}
        >
          <div className="grid grid-cols-3 grid-rows-3 w-full h-full">
            {cells}
          </div>
          {winner !== undefined && winLine.length > 0 && (
            <svg className="absolute inset-[-2%] w-[104%] h-[104%] pointer-events-none z-10">
              <line
                {...getLineCoords(winLine)}
                className={`strike-path ${winner === "0" ? "x-win" : "o-win"}`}
              />
            </svg>
          )}
        </div>

        {/* Big Symbols for Result View */}
        <div
          className={`absolute flex flex-col items-center justify-center transition-all duration-700 cubic-bezier(0.34, 1.56, 0.64, 1) ${resultActive}`}
        >
          {winner === "0" && (
            <XSymbol className="w-48 h-48 min-[500px]:w-64 min-[500px]:h-64" />
          )}
          {winner === "1" && (
            <OSymbol className="w-48 h-48 min-[500px]:w-64 min-[500px]:h-64" />
          )}
          {isDraw && (
            <div className="flex gap-8 min-[500px]:gap-12">
              <XSymbol className="w-32 h-32 min-[500px]:w-44 min-[500px]:h-44" />
              <OSymbol className="w-32 h-32 min-[500px]:w-44 min-[500px]:h-44" />
            </div>
          )}
        </div>
      </div>

      {/* Persistent Restart Button */}
      <div className="h-[100px] flex items-end">
        <Button
          variant="outline"
          className="rounded-full border-[4px] border-white text-white hover:bg-white/10 active:scale-95 transition-all font-black text-xl px-12 h-16 uppercase tracking-widest bg-transparent shadow-2xl"
          onClick={() => reset()}
        >
          Restart Game
        </Button>
      </div>
    </div>
  )
}

export default TicTacToeBoard
