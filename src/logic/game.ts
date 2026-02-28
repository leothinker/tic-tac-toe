export interface GameState {
  cells: (string | null)[]
}

/**
 * Checks for a winner and returns the winning indices.
 */
function GetWinningPositions(cells: (string | null)[]): number[] | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ]

  for (const pos of lines) {
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

  turn: { moveLimit: 1 },

  moves: {
    clickCell: ({ G, ctx }: any, id: number) => {
      if (G.cells[id] === null) {
        G.cells[id] = ctx.currentPlayer
      }
    },
  },

  endIf: ({ G, ctx }: any) => {
    const line = GetWinningPositions(G.cells)
    if (line) return { winner: ctx.currentPlayer, line }
    if (G.cells.every((c) => c !== null)) return { draw: true }
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
