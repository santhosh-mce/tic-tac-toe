import { createSlice } from "@reduxjs/toolkit";

const checkWinner = (board) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

const isFull = (board) => board.every((cell) => cell !== null);

// 🔥 Minimax Algorithm in JavaScript
const minimax = (board, isMaximizing, depth = 0) => {
  const winner = checkWinner(board);
  if (winner === "O") return 10 - depth;
  if (winner === "X") return depth - 10;
  if (isFull(board)) return 0;

  if (isMaximizing) {
    let best = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        board[i] = "O";
        const score = minimax(board, false, depth + 1);
        board[i] = null;
        best = Math.max(score, best);
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        board[i] = "X";
        const score = minimax(board, true, depth + 1);
        board[i] = null;
        best = Math.min(score, best);
      }
    }
    return best;
  }
};

// 💡 Computer makes the best possible move
const getBestMove = (board) => {
  let bestScore = -Infinity;
  let move = -1;

  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      board[i] = "O";
      const score = minimax(board, false);
      board[i] = null;

      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }

  return move;
};


const initialState = {
  board: Array(9).fill(null),
  isXNext: true,
  winner: null,
  mode: null, // single or two
};

export const tictactoeSlice = createSlice({
  name: "tictactoe",
  initialState,
  reducers: {
    setMode: (state, action) => {
      state.mode = action.payload;
      state.board = Array(9).fill(null);
      state.isXNext = true;
      state.winner = null;
    },
    makeMove: (state, action) => {
      const index = action.payload;
      if (state.board[index] || state.winner) return;

      state.board[index] = state.isXNext ? "X" : "O";
      let winner = checkWinner(state.board);
      if (winner) {
        state.winner = winner;
        return;
      }

      state.isXNext = !state.isXNext;

      // 🎮 AI move (O)
      if (state.mode === "single" && !state.isXNext && !state.winner) {
        const move = getBestMove([...state.board]);
        if (move !== -1) {
          state.board[move] = "O";
          const winnerAfterAI = checkWinner(state.board);
          if (winnerAfterAI) state.winner = winnerAfterAI;
          else state.isXNext = true;
        }
      }
    },
    resetGame: (state) => {
      state.board = Array(9).fill(null);
      state.isXNext = true;
      state.winner = null;
    },
  },
});

export const { makeMove, resetGame, setMode } = tictactoeSlice.actions;
export default tictactoeSlice.reducer;
