import { useDispatch, useSelector } from "react-redux";
import GameCard from "./GameCard";
import { useEffect } from "react";
import { gameplayActions } from "../store/gamePlaySlice";

export default function GameTable({ }) {
    const dispatch = useDispatch();
    const { gameTable, isPreviewing } = useSelector(state => state.gameplay);
    const { gridSize } = useSelector(state => state.game);

    useEffect(() => {
        if (isPreviewing) {
            const timer = setTimeout(() => {
                dispatch(gameplayActions.endPreview());
            }, 2500); // 👈 ۲.۵ ثانیه کارت‌ها رو به کاربر نشون میده (قابل تغییره)

            return () => clearTimeout(timer);
        }
    }, [isPreviewing, dispatch]);

    return (
        <div className={`game-board grid-${gridSize}x${gridSize}`}>
            {gameTable.map(card => (
                <GameCard
                    key={card.id}
                    cardData={card}
                />
            ))}
        </div>
    );
}