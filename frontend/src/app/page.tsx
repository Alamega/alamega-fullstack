import {Metadata} from "next";
import React from "react";
import {getSession} from "@/libs/auth";

export const metadata: Metadata = {
    title: "Главная"
};

export default async function Home() {
    const session: ISession | null = await getSession();
    return (
        <>
            {session ? (
                <p>Приветствую товарищ {session.user.username}!</p>
            ) : (
                <p>Чувствую присутствие неавторизованного пользователя.</p>
            )}
        </>
    );
}

