import { Outlet } from "react-router";

export default function MainLayout(){
    return (
        <div class="game-container">
            <Outlet/>
        </div>
    );
}