import { useEffect, useState } from "react";
import { formatTime } from "../utils/time";
import { useDispatch, useSelector } from "react-redux";
import { gameplayActions } from "../store/gamePlaySlice";

export default function Timer() {
    const dispatch = useDispatch();

    const { spentTime, userWon } = useSelector(state => state.gameplay);

    useEffect(() => {
        if (userWon) return;

        const timer = setInterval(() => {
            dispatch(gameplayActions.increaseTime());
        }, 1000);

        return () => clearInterval(timer);
    }, [userWon, dispatch]);

    const passedTimeFormatted = formatTime(spentTime);
    return (
        <div className="stat-box">⏱️ زمان: <span id="stat-time">{passedTimeFormatted}</span></div>
    );
}