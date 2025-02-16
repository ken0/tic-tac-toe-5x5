import { useState } from 'react'
import './App.css'
import Game from './components/Game'

function App() {
  return (
    <div className="app">
      <h1>Tic Tac Toe 5x5</h1>
      <Game />
    </div>
  )
}

export default App