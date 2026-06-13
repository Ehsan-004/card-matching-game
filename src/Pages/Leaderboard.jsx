import { Link } from "react-router";

export default function Leaderboard() {
    return (
        <section id="leaderboard-page" class="game-screen">
            <div class="sketch-panel sketch-border">
                <h1 class="page-title">🏆 تالار افتخارات</h1>

                <div class="sketch-divider"></div>

                <div class="leaderboard-container">
                    {/* <div class="leaderboard-header">
                        <span class="col-rank">رتبه</span>
                        <span class="col-name">نام بازیکن</span>
                        <span class="col-score">امتیاز</span>
                        <span class="col-time">زمان</span>
                    </div>

                    <div class="leaderboard-list">
                        <div class="leaderboard-row gold-rank">
                            <span class="col-rank">🥇 ۱</span>
                            <span class="col-name">سارا محمدی</span>
                            <span class="col-score">۲,۴۵۰</span>
                            <span class="col-time">۰۱:۱۵</span>
                        </div>

                        <div class="leaderboard-row silver-rank">
                            <span class="col-rank">🥈 ۲</span>
                            <span class="col-name">آرمین راد</span>
                            <span class="col-score">۲,۱۰۰</span>
                            <span class="col-time">۰۱:۳۲</span>
                        </div>

                        <div class="leaderboard-row bronze-rank">
                            <span class="col-rank">🥉 ۳</span>
                            <span class="col-name">تارا شریفی</span>
                            <span class="col-score">۱,۸۵۰</span>
                            <span class="col-time">۰۱:۵۰</span>
                        </div> */}

                    {/* </div> */}
                </div>

                <div class="sketch-divider"></div>

                <Link
                    to="/"
                    class="sketch-btn secondary">
                    ⬅️ بازگشت به منو
                </Link>

            </div>
        </section>
    );
}