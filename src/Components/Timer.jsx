import { useEffect, useState } from "react";
import { formatTime } from "../utils/time";

export default function Timer() {
    const [passedTime, setPassedTime] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setPassedTime(prevTime => prevTime + 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);
    const passedTimeFormatted = formatTime(passedTime);
    return (
        <div className="stat-box">⏱️ زمان: <span id="stat-time">{passedTimeFormatted}</span></div>
    );
}