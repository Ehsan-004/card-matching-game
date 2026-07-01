import { createSlice } from "@reduxjs/toolkit";


const initialGamePlay = {
    gameTable: [],
    selectedCards: [],
    score: 0,
    spentTime: 0,
    status: "playing",
    isPreviewing: false,
    userWon: false,
}


const gamePlaySlice = createSlice({
    name: "gameplay",
    initialState: initialGamePlay,
    reducers: {
        initializeGame(state, action) {
            state.gameTable = action.payload.gameTable;
            state.isPreviewing = true;
            state.score = 0;
        },
        endPreview(state) {
            state.isPreviewing = false;
        },
        selectCard(state, action) {
            const { cardId, gridSize } = action.payload;

            if (state.isPreviewing) return;

            const card = state.gameTable.find(c => c.id === cardId);

            if (state.selectedCards.length >= 2) return;

            if (!card || card.flipped || card.matched) return;

            card.flipped = true;

            state.selectedCards.push(cardId);

            // with help of Gemini
            if (state.selectedCards.length === 2) {
                const [id1, id2] = state.selectedCards;

                const c1 = state.gameTable.find(c => c.id === id1);
                const c2 = state.gameTable.find(c => c.id === id2);

                let multiplier = 1;

                if (gridSize === "6") multiplier = 1.5;
                if (gridSize === "8") multiplier = 2;

                if (c1.value === c2.value) {
                    c1.matched = true;
                    c2.matched = true;

                    state.score += (100 * multiplier);

                    state.selectedCards = [];
                } else {
                    const penalty = 20 / multiplier;

                    if (state.score >= penalty) {
                        state.score -= penalty;
                    } else {
                        state.score = 0;
                    }
                }
            }
            const hasUnmatchedCard = state.gameTable.some(card => !card.matched);

            if (!hasUnmatchedCard) {
                state.userWon = true;
            }
        },
        resetSelectedCards(state) {
            if (state.selectedCards.length === 2) {
                const [id1, id2] = state.selectedCards;
                const c1 = state.gameTable.find(c => c.id === id1);
                const c2 = state.gameTable.find(c => c.id === id2);

                if (c1) c1.flipped = false;
                if (c2) c2.flipped = false;
            }
            state.selectedCards = []; 
        },
        resetGame(state) {
            state.gameTable = []
            state.selectedCards = []
            state.score = 0
            state.spentTime = 0
            state.status = "playing"
            state.isPreviewing = false
            state.userWon = false
        },
        increaseTime(state) {
            state.spentTime = state.spentTime + 1;
        }
    }
})

export default gamePlaySlice.reducer;
export const gameplayActions = gamePlaySlice.actions;
