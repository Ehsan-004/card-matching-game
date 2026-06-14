import { useEffect, useRef, useState } from "react";
import Modal from "../Components/Modal";
import { Link, Navigate, useNavigate } from "react-router";
import { gameActions } from "../store/gameSlice.js";
import { useDispatch } from "react-redux";
import { gameplayActions } from "../store/gamePlaySlice.js";


export default function Home() {
    const [errors, setErrors] = useState({
        username: "",
        gridSize: "",
    });

    const dispatch = useDispatch();
    const dialog = useRef();
    const game = useRef();
    const navigate = useNavigate();

    function handleClickLeaderboard() {
        dialog.current.open();
    }

    function handleClickStart() {
        setErrors({
            username: "",
            gridSize: "",
        });

        gameplayActions.resetGame();

        game.current.open();
    }


    function handleSubmitGame(event) {
        event.preventDefault();

        let newErrors = {
            username: "",
            gridSize: "",
        };

        const formData = new FormData(event.target);

        const username = formData.get("username");
        const gridSize = formData.get("grid-size");

        if (username.trim() === "") {
            newErrors.username = "لطفا اسمت رو اینجا بنویس.";
        }

        if (!gridSize) {
            newErrors.gridSize = "ابعاد صفحه یادت رفته؟";
        }

        setErrors(newErrors);

        // اگر خطایی وجود داشت ادامه نده
        if (newErrors.username || newErrors.gridSize) {
            return;
        }

        const data = {
            username,
            gridSize: Number(gridSize),
        }

        dispatch(gameActions.startGame(data));

        navigate("/game");
    }


    return (
        <>
            <section id="home-page" className="game-screen">
                <div className="sketch-panel sketch-border">
                    <div className="title-container">
                        <h1 className="game-title">💡 بازی حافظه حواس جمع!</h1>
                        <span className="subtitle">یک بازی فانتزی و باحال</span>
                    </div>

                    <div className="sketch-divider"></div>

                    <div className="menu-actions">
                        <button
                            className="sketch-btn primary block-btn"
                            onClick={handleClickStart}
                        >
                            شروع بازی جدید 🏁
                        </button>

                        <Link
                            className="sketch-btn secondary block-btn"
                            to="/leaderboard"
                        >
                            جدول امتیازات 🏆
                        </Link>

                        <button
                            className="sketch-btn secondary block-btn"
                            onClick={handleClickLeaderboard}
                            id="btn-open-about">
                            درباره ما ℹ️
                        </button>

                        {/* <button className="sketch-btn danger block-btn">🚪 خروج</button> */}
                    </div>
                </div>
            </section>

            <Modal
                title="ℹ️ درباره این بازی"
                ref={dialog}
                className="sketch-modal sketch-panel sketch-border"
            >
                <div className="sketch-divider"></div>

                <div className="about-content">
                    <p>این بازی یک پروژه <strong>کارت حافظه</strong> صمیمی و دوستانه است که با عشق و مداد طراحی
                        شده است! ✏️</p>
                    <p>قوانین بازی ساده هستند: شما باید کارت‌های مشابه را پیدا کنید تا صفحه خالی شود. هرچه با تعداد کلیک کمتر و
                        در زمان کوتاه‌تری بازی را تمام کنید، امتیاز بیشتری کسب خواهید کرد.</p>
                    <p className="signature">طراحی شده با حس خوبِ برای شما | <a href="https://github.com/Ehsan-004" target="_blanck">Ehsan-004</a></p>

                </div>

                <div className="sketch-divider"></div>

                <button
                    onClick={() => dialog.current.close()}
                    className="sketch-btn secondary"
                    id="btn-close-about"
                >
                    بازگشت به منو ⬅️
                </button>
            </Modal>

            {/* < !-- ۱. مودال شروع بازی(Start Game Dialog)-- > */}
            {/* < !--ویژگی open در اینجا فقط برای پیش‌نمایش در حالت HTML خام قرار دارد؛ در پروژه ری‌اکت آن را حذف و به جایش در هوکِ بارگذاری، متد.showModal() را اجرا کنید-- > */}
            <Modal
                className="sketch-modal sketch-panel sketch-border"
                title="تنظیمات بازی جدید 🎮"
                ref={game}
            >
                <form onSubmit={handleSubmitGame}>
                    <div className="sketch-divider"></div>

                    {/* <!-- فیلد نام بازیکن --> */}
                    <div className="form-group">
                        <label className="sketch-label" htmlFor="player-name-input">✏️ نام قشنگت رو بنویس:</label>
                        <input type="text" id="player-name-input" className="sketch-input" placeholder="مثلاً: آرتین..."
                            autoComplete="off" name="username" />
                        {errors.username && <span className="sketch-error-text">✍️ {errors.username}</span>}
                    </div>

                    {/* <!-- انتخاب ابعاد بازی --> */}
                    <div className="form-group">
                        <span className="sketch-label">📐 ابعاد صفحه بازی را انتخاب کن:</span>
                        <div className="grid-selector-group">

                            <label className="grid-option">
                                <input type="radio" name="grid-size" value={4} />
                                <span className="option-card sketch-border">۴ × ۴</span>
                            </label>
                            <label className="grid-option">
                                <input type="radio" name="grid-size" value={6} />
                                <span className="option-card sketch-border">۶ × ۶</span>
                            </label>
                            <label className="grid-option">
                                <input type="radio" name="grid-size" value={8} />
                                <span className="option-card sketch-border">۸ × ۸</span>
                            </label>
                        </div>
                        {errors.gridSize && <span className="sketch-error-text">🧩 {errors.gridSize}</span>}
                    </div>

                    <div className="sketch-divider"></div>

                    {/* <!-- دکمه تایید و ورود به بازی --> */}
                    <button
                        type="submit"
                        className="sketch-btn primary block-btn"
                        style={{ marginTop: "10px" }}
                    >
                        بزن بریم بازی! 🎲
                    </button>

                </form>
                <button
                    onClick={() => game.current.close()}
                    className="sketch-btn secondary"
                    id="btn-close-about"
                >
                    بازگشت به منو ⬅️
                </button>
            </Modal>

        </>
    );
}