"use client"

import Link from "next/link";
import "./menu.css";
import {logout} from "@/lib";
import React from "react";

export default function Menu() {
    const signOut = async () => {
        await logout();
    };
    return (
        <div className="menu">

            <Link href={"/"}>Главная</Link>
            <Link href={"/auth/login"}>Вход</Link>
            <Link href={"/auth/registration"}>Регистрация</Link>
            <a style={{cursor: "pointer"}} onClick={signOut}>Выйти</a>
            <Link href={"/movies"}>Плеер</Link>
        </div>
    );
}
