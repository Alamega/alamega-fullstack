import {Metadata} from "next";
import React from "react";
import {getSession} from "@/lib";
import LogoutBtn from "@/components/logout-btn";

export const metadata: Metadata = {
    title: "Главная",
    description: "Главная",
};

export default async function Home() {
    const session = await getSession();
    return (
        <>
            <p>Страница на стадии разработки, так и знайте!</p>
            {session &&
                <>
                    <p>Добро пожаловать, {session.user.username}.</p>
                    <LogoutBtn/>
                </>
            }
        </>
    );
}

