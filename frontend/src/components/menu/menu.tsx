"use server"

import Link from "next/link";
import "./menu.css";
import React from "react";
import {getSession} from "@/libs/auth";
import {LogoutLink} from "@/components/logout/logout";

export default async function Menu() {
    const session: ISession | null = await getSession();

    return (
        <div className="menu">
            <Link href={"/"}>Главная</Link>
            {session ? (
                <>
                    <Link href={"/users/" + session.user.id}>Личный кабинет</Link>
                    {session.user.role.value == "ADMIN" &&
                        <Link href={"/test"}>Тест</Link>
                    }
                </>
            ) : (
                <>
                    <Link href={"/auth/login"}>Вход</Link>
                    <Link href={"/auth/registration"}>Регистрация</Link>
                </>
            )}
            <Link href={"/movies"}>Плеер</Link>
            <Link href={"/chat"}>Чат</Link>
            {session &&
                <>
                    <LogoutLink/>
                </>
            }
        </div>
    );
}
