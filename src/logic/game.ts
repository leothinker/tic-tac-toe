export interface GameState {
  cells: (string | null)[]
}

function GetWinningPositions(cells: (string | null)[]): number[] | null {
  const positions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (const pos of positions) {
    const symbols = pos.map((i) => cells[i])
    if (symbols[0] !== null && symbols.every((s) => s === symbols[0])) {
      return pos
    }
  }
  return null
}

const TicTacToe = {
  name: "tic-tac-toe",

  setup: (): GameState => ({
    cells: Array(9).fill(null),
  }),

  turn: {
    moveLimit: 1,
  },

  moves: {
    clickCell: ({ G, ctx }: any, id: number) => {
      if (G.cells[id] === null) {
        G.cells[id] = ctx.currentPlayer
      }
    },
  },

  endIf: ({ G, ctx }: any) => {
    const winPos = GetWinningPositions(G.cells)
    if (winPos) {
      return { winner: ctx.currentPlayer, line: winPos }
    }
    if (G.cells.filter((c: string | null) => c === null).length === 0) {
      return { draw: true }
    }
  },

  ai: {
    enumerate: (G: GameState) => {
      const moves = []
      for (let i = 0; i < 9; i++) {
        if (G.cells[i] === null) {
          moves.push({ move: "clickCell", args: [i] })
        }
      }
      return moves
    },
  },
}

export default TicTacToe
