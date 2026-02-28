import { Client } from "boardgame.io/react"
import { TicTacToeBoard } from "./components/Board"
import { TicTacToe } from "./game"
import "./App.css"

const App = Client({
  game: TicTacToe,
  board: TicTacToeBoard,
})

export default App
