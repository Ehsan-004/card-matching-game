import { useDispatch, useSelector } from "react-redux";
import GameTable from "../Components/GameTable";
import { createMemoryGrid } from "../utils/game";
import { EMOJIES } from "../utils/game";
import { gameplayActions } from "../store/gamePlaySlice";
import GameHeader from "../Components/GameHeader";
import { useEffect, useRef } from "react";
import Modal from "../Components/Modal";
import { Link } from "react-router";
import { formatTime } from "../utils/time";


export default function Game() {
    const dialogRef = useRef();
    const winRef = useRef();
    const { username, gridSize } = useSelector(state => state.game);
    const { userWon, score, gameTable, spentTime } = useSelector(state => state.gameplay);

    const passedTimeFormatted = formatTime(spentTime);

    const allCardsNum = gridSize * gridSize;

    const dispatch = useDispatch();

    useEffect(() => {
        const gameTable = createMemoryGrid(EMOJIES, gridSize);
        dispatch(gameplayActions.initializeGame({ gameTable }))
    }, [EMOJIES, gridSize]);

    useEffect(() => {
        if (userWon) {
            winRef.current?.open();
        } else {
            winRef.current?.close();
        }
    }, [userWon]);

    function handleCLickExit() {
        dialogRef.current.open();
    }


    console.log("[debug] `Game.jsx` - winning state: " + userWon)


    return (
        <>
            <section id="game-page" className="game-screen">

                <GameHeader />

                <GameTable />

                <div className="game-footer">
                    <button
                        onClick={handleCLickExit}
                        className="sketch-btn danger" id="btn-trigger-exit"
                    >
                        🚪 انصراف و خروج
                    </button>
                </div>

            </section>



            {/* <!-- ۲. مودال تایید خروج عمومی(Confirmation Dialog)-- >
            < !--این دیالوگ در زمان کلیک بر روی انصراف، پدیدار خواهد شد-- > */}
            <Modal
                ref={dialogRef}
                id="confirm-modal"
                className="sketch-modal sketch-panel sketch-border"
            >
                <h2>⚠️ مطمئنی می‌خوای خارج بشی؟</h2>
                <p style={{ margin: "15px 0", color: "#7d7571" }}>تمام امتیازها و زمان ثبت شده در این بازی از دست خواهد رفت!</p>
                <div className="sketch-divider"></div>
                <div className="modal-buttons">
                    <Link to={"/"} className="sketch-btn danger">بله، خروج</Link>

                    <button
                        onClick={() => dialogRef.current.close()}
                        className="sketch-btn secondary"
                    >
                        خیر، ادامه بازی
                    </button>
                </div>
            </Modal>

            <Modal
                ref={winRef}
                id="victory-modal"
                className="sketch-modal sketch-panel sketch-border"
            >
                <div className="victory-header">
                    <span className="victory-emoji">🏆</span>
                    <h2 className="victory-title">✨ هورااا! برنده شدی! ✨</h2>
                </div>

                <div className="sketch-divider"></div>

                <p className="victory-subtext">حافظه فوق‌العاده‌ات باعث شد همه کارت‌ها رو مثل یک هنرمند واقعی جفت کنی! ✏️🎨</p>

                <div className="sketch-stats-panel sketch-border">
                    <div className="stats-grid">
                        <div className="stat-item">
                            <span className="stat-label">⏱️ زمان ثبت رکورد:</span>
                            <span className="stat-value" id="victory-time">{passedTimeFormatted}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">✨ امتیاز نهایی:</span>
                            <span className="stat-value" id="victory-score">{score}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">🧩 جفت‌ها:</span>
                            <span className="stat-value" id="victory-pairs">{allCardsNum}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">📐 ابعاد زمین بازی:</span>
                            <span className="stat-value" id="victory-grid">{gridSize} × {gridSize}</span>
                        </div>
                    </div>
                </div>

                <div className="sketch-divider"></div>

                <div className="modal-buttons">
                    <Link to="/" className="sketch-btn primary">
                        🏠 منوی اصلی
                    </Link>
                    <Link to="/leaderboard" className="sketch-btn secondary">
                        🏆 جدول امتیازات
                    </Link>
                </div>
            </Modal>
        </>
    );
}