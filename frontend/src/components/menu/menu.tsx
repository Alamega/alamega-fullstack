"use server"

import Link from "next/link";
import "./menu.css";
import {getSession} from "@/libs/auth";
import React from "react";
import {LogoutLink} from "@/components/logout";

export default async function Menu() {
    const session: Session | null = await getSession();

    return (
        <div className="menu">
            <Link href={"/"}>Главная</Link>
            {!session &&
                <>
                    <Link href={"/auth/login"}>Вход</Link>
                    <Link href={"/auth/registration"}>Регистрация</Link>
                </>
            }
            {session &&
                <>
                    <LogoutLink/>
                </>
            }
            <Link href={"/movies"}>Плеер</Link>
        </div>
    );
}
