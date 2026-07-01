import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gameplayActions } from "../store/gamePlaySlice";


export default function GameCard({ cardData }) {

    const dispatch = useDispatch();

    const {selectedCards, isPreviewing} = useSelector(state => state.gameplay);
    const gridSize = useSelector(state => state.game.gridSize);

    useEffect(() => {
        if (selectedCards.length === 2) {
            const timer = setTimeout(() => {
                dispatch(gameplayActions.resetSelectedCards());
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [selectedCards, dispatch]);

    const isFlipped = cardData.flipped || isPreviewing;
    const cssClasses = `sketch-card ${isFlipped ? "flipped" : ""}`;

    function handleCLickCard() {
        dispatch(gameplayActions.selectCard({ cardId: cardData.id, gridSize: gridSize }));
    }


    return (
        <div
            onClick={handleCLickCard}
            className={cssClasses}
        >
            <div className="card-inner">
                <div className="card-back sketch-border">
                    <span className="card-question">❓</span>
                </div>
                <div className="card-front sketch-border">
                    <span className="card-icon">{cardData.value}</span>
                </div>
            </div>
        </div>
    );
}