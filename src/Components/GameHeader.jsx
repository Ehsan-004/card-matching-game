import { useSelector } from "react-redux";
import Timer from "../Components/Timer";

const initialGamePlay = {
    gameTable: [],
    selectedCards: [],
    matchedCards: [],
    score: 0,
    spentTime: 0,
    status: "playing"
}


export default function GameHeader({ }) {
    const { score, gameTable } = useSelector(state => state.gameplay);

    const { username, gridSize } = useSelector(state => state.game);
    const allCardsNum = gridSize * gridSize / 2;
    const matchedCards = gameTable.filter(c => c.matched === true).length;
    const correctNum = matchedCards / 2;

    return (
        <div class="game-header sketch-border">
            <div class="header-row">
                <div class="stat-box">👤 بازیکن: <span id="stat-player-name">{username}</span></div>
                <div class="stat-box">✨ امتیاز: <span id="stat-score">{score}</span></div>
            </div>
            <div class="header-row">
                <Timer />
                <div class="stat-box">🧩 جفت‌ها: <span id="stat-pairs">{correctNum} از {allCardsNum}</span></div>
                <div class="stat-box">📐 ابعاد: <span id="stat-grid-size">{gridSize} در {gridSize}</span></div>
            </div>
        </div>
    );
}