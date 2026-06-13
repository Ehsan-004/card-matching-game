import { configureStore, createStore } from "@reduxjs/toolkit";
import gameReducer from "./gameSlice.js";
import gamePlaySlice from "./gamePlaySlice.js";


const store = configureStore({
    reducer: {
        game: gameReducer,
        gameplay: gamePlaySlice
    }
});

export default store;
