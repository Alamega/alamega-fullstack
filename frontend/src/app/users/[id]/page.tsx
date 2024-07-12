import {Metadata} from "next";
import {getUserInfo} from "@/libs/users";
import {getSession} from "@/libs/auth";
import React from "react";
import "./page.css"
import PostsSection from "@/components/posts/postsSection";
import Image from "next/image";
import UserIcon from "../../../../public/images/icon.png"

export async function generateMetadata({params}: {
    params: { id: string }
}): Promise<Metadata> {
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
            <div className={"user-card"}>
                <div className={"user-card-image"}>
                    <Image src={UserIcon} alt={"Юзер"} width={140} height={140}/>
                </div>
                <h1 className={"user-card-name"}>
                    {user.username}
                </h1>
                <span className={"user-card-role"}>
                    {user.role === "USER" && <span style={{color: "green"}}>Пользователь</span>}
                    {user.role === "ADMIN" && <span style={{color: "red"}}>Администратор</span>}
                </span>
                <p className={"user-card-info"}></p>
            </div>
            <PostsSection userId={params.id} session={session}/>
        </>
    );
}

