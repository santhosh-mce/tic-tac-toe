import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeMove, resetGame, setMode } from "./features/Tictactoe/TictactoeSlice";

const Tictactoe = () => {
  const dispatch = useDispatch();
  const { board, isXNext, winner, mode } = useSelector((state) => state.tictactoe);

  const isDraw = board.every((cell) => cell) && !winner;

  if (!mode) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <h1 className="text-3xl font-bold mb-6">Tic Tac Toe</h1>
        <p className="mb-4 text-lg">Choose Game Mode:</p>
        <div className="flex gap-4">
          <button
            onClick={() => dispatch(setMode("single"))}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg"
          >
            Single Player
          </button>
          <button
            onClick={() => dispatch(setMode("two"))}
            className="px-6 py-2 bg-green-600 hover:bg-green-500 rounded-lg"
          >
            Two Player
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Tic Tac Toe</h1>

      {/* Game Board */}
      <div className="grid grid-cols-3 gap-2">
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => dispatch(makeMove(index))}
            className="w-24 h-24 text-4xl font-bold bg-gray-800 hover:bg-gray-700 rounded-xl border border-gray-600 flex items-center justify-center transition"
          >
            {cell}
          </button>
        ))}
      </div>

      {/* Info Text */}
      <div className="mt-6 text-2xl">
        {!winner && !isDraw && `Next Player: ${isXNext ? "X" : "O"}`}
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={() => dispatch(resetGame())}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg"
        >
          Restart Game
        </button>
        <button
          onClick={() => dispatch(setMode(null))}
          className="px-6 py-2 bg-red-600 hover:bg-red-500 rounded-lg"
        >
          Change Mode
        </button>
      </div>

      {/* 🏆 Popup Winner / Draw */}
      {(winner || isDraw) && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-gray-800 rounded-2xl p-8 text-center shadow-2xl animate-pop">
            <h2 className="text-3xl font-bold mb-4">
              {winner ? `🏆 Winner: ${winner}` : "🤝 It's a Draw!"}
            </h2>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => dispatch(resetGame())}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg"
              >
                Play Again
              </button>
              <button
                onClick={() => dispatch(setMode(null))}
                className="px-6 py-2 bg-red-600 hover:bg-red-500 rounded-lg"
              >
                Change Mode
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tictactoe;
