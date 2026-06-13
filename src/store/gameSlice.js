import { createSlice } from "@reduxjs/toolkit";


const initialGame = {
    username: "",
    gridSize: "",
}


const gameSlice = createSlice({
    name: "game",
    initialState: initialGame,
    reducers: {
        startGame(state, action) {
            state.username = action.payload.username;
            state.gridSize = action.payload.gridSize;
            state.spentTime = 0;
        },
    }
})

export default gameSlice.reducer;
export const gameActions = gameSlice.actions;
