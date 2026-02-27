import { Client } from 'boardgame.io/react';
import { TicTacToe } from './logic/game';
import { TicTacToeBoard } from './components/TicTacToeBoard';
import './App.css';

const App = Client({
  game: TicTacToe,
  board: TicTacToeBoard,
});

export default App;
