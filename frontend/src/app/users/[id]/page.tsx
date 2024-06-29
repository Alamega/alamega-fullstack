import {Metadata, ResolvingMetadata} from "next";
import {getUserInfo} from "@/libs/users";
import {getSession} from "@/libs/auth";
import React from "react";
import "./page.css"
import UserPosts from "@/app/users/userPosts";

export async function generateMetadata({params}: {
    params: { id: string }
}, parent: ResolvingMetadata): Promise<Metadata> {
    const user = await getUserInfo(params.id)
    return {
        title: user.username,
    }
}

export default async function User({params}: { params: { id: string } }) {
    const user = await getUserInfo(params.id)
    const session = await getSession();

    return (
        <>
            <div>
                {user.username}
                <br/>
                {user.role === "USER" && <span>Пользователь</span>}
                {user.role === "ADMIN" && <span>Администратор</span>}
            </div>
            <UserPosts userId={params.id} session={session}/>
        </>
    );
}