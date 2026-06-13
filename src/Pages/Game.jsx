import { useDispatch, useSelector } from "react-redux";
import GameTable from "../Components/GameTable";
import { createMemoryGrid } from "../utils/game";
import { EMOJIES } from "../utils/game";
import { gameplayActions } from "../store/gamePlaySlice";
import GameHeader from "../Components/GameHeader";
import { useEffect, useRef } from "react";
import Modal from "../Components/Modal";
import { Link } from "react-router";


export default function Game() {
    const dialogRef = useRef();
    const { gridSize } = useSelector(state => state.game);

    const dispatch = useDispatch();

    useEffect(() => {
        const gameTable = createMemoryGrid(EMOJIES, gridSize);
        dispatch(gameplayActions.initializeGame({ gameTable }))
    }, [EMOJIES, gridSize]);

    function handleCLickExit() {
        dialogRef.current.open();
    }


    return (
        <>
            <section id="game-page" className="game-screen">

                <GameHeader />

                <GameTable />

                {/* <!-- ج) دکمه پایینی خروج از بازی --> */}
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
        </>
    );
}