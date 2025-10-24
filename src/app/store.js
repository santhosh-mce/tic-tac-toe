import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/Counter/counterSlice";
import movieReducer from "../features/Movies/movieSlice";
import ticteactoeReducer from "../features/Tictactoe/TictactoeSlice"

export const store = configureStore({
    reducer:{
        counter: counterReducer,
        movies: movieReducer,
        tictactoe: ticteactoeReducer,
    }
})