"use client"

import {logout} from "@/lib";

export default function LogoutBtn() {
    const handleClick = async () => {
        await logout();
    }
    return (
        <>
            <button className="button-green" onClick={handleClick}>Выйти</button>
        </>
    )
}
