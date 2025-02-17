# 5x5 Tic-tac-toe Game

A modern implementation of Tic-tac-toe on a 5x5 grid, built with React and Vite. Play against an AI opponent that can both attack and defend strategically.

## Features

- 🎮 5x5 game board for extended gameplay
- 🤖 Smart AI opponent that:
  - Looks for winning moves
  - Blocks player's winning attempts
  - Makes strategic random moves
- ✨ Winning condition: 5 in a row (horizontal, vertical, or diagonal)
- 🎯 Real-time game state tracking
- 🔄 Game reset functionality
- 🎨 Clean and responsive UI

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/tic-tac-toe-5x5.git
cd tic-tac-toe-5x5
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and navigate to the URL shown in your terminal (typically http://localhost:5173)

## How to Play

1. The game starts with an empty 5x5 grid
2. You play as 'X' and the AI plays as 'O'
3. Click any empty cell to make your move
4. The AI will automatically make its move after a short delay
5. Get 5 of your symbols in a row (horizontally, vertically, or diagonally) to win
6. Use the "Reset Game" button to start a new game at any time

## Technologies Used

- React 18
- Vite
- CSS3
- JavaScript (ES6+)

## Development

To build for production:
```bash
npm run build
```

To preview the production build:
```bash
npm run preview
```

## License

This project is open source and available under the [MIT License](LICENSE).