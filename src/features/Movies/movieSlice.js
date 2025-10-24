import { createSlice } from "@reduxjs/toolkit";


const storedMovies = JSON.parse(localStorage.getItem("movies")) || [];
const initialState = {
    movies: storedMovies
}

export const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        addmovie: (state, action) => {
            const newmovie = {
                id: state.movies.length + 1,
                name: action.payload
            }
            state.movies.push(newmovie);

            localStorage.setItem("movies", JSON.stringify(state.movies));
        },
        deletemovie: (state, action) => {
            state.movies = state.movies.filter(movie => movie.id !== action.payload);
            state.movies = state.movies.map((movie, index) => ({
                ...movie,
                id: index + 1
            }))
            localStorage.setItem("movies", JSON.stringify(state.movies));
        },
        updatemovie: (state, action) => {
            const { id, name } = action.payload
            const movies = state.movies.find(movie => movie.id === id)
            if (movies) {
                movies.name = name
            }
            localStorage.setItem("movies", JSON.stringify(state.movies));
        }
    }
});


export const { addmovie, deletemovie, updatemovie } = movieSlice.actions;
export default movieSlice.reducer;