import Link from "next/link";
import "./menu.css";
import React from "react";
import {getSession, logout} from "@/libs/auth";

export default async function Menu() {
    const session = await getSession();

    return (
        <nav className="menu">
            <Link href="/">Главная</Link>

            {session && (
                <Link href={`/users/${session.user.id}`}>Личный кабинет</Link>
            )}

            {!session && (
                <>
                    <Link href="/auth/login">Вход</Link>
                    <Link href="/auth/registration">Регистрация</Link>
                </>
            )}

            <Link href="/chat">Чат</Link>

            {session && (
                <form action={logout} className="menu-form">
                    <button type="submit" className="menu-btn">
                        Выйти
                    </button>
                </form>
            )}
        </nav>
    );
}
