import { Client } from "boardgame.io/react"
import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import TicTacToeBoard from "./components/Board"
import TicTacToe from "./logic/game"
import "./index.css"

const App = Client({
  game: TicTacToe,
  board: TicTacToeBoard,
})

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
