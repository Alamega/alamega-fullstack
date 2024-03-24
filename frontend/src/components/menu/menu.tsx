"use client"

import Link from "next/link";
import "./menu.css";

export default function Menu() {
    return (
        <div className="menu">
            <Link href={"/"}>Главная</Link>
            <Link href={"/auth/login"}>Вход</Link>
            <Link href={"/auth/registration"}>Регистрация</Link>
            <Link href={"/movies"}>Плеер</Link>
        </div>
    );
}
