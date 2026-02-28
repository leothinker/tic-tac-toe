export interface GameState {
  cells: (string | null)[]
}

function IsVictory(cells: (string | null)[]): boolean {
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

  const isRowComplete = (row: number[]) => {
    const symbols = row.map((i) => cells[i])
    return symbols.every((i) => i !== null && i === symbols[0])
  }

  return positions.map(isRowComplete).some((i) => i === true)
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
    if (IsVictory(G.cells)) {
      return { winner: ctx.currentPlayer }
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
