import {Metadata} from "next";
import {getUserInfo} from "@/libs/users";
import {getSession} from "@/libs/auth";
import React from "react";
import "./page.css";
import PostsSection from "@/components/posts/postsSection";
import Image from "next/image";
import UserIcon from "../../../../public/images/icon.png";
import {notFound} from "next/navigation";

export async function generateMetadata(
    props: {
        params: Promise<{ id: string }>
    }
): Promise<Metadata> {
    try {
        const params = await props.params;
        const user = await getUserInfo(params.id);
        return {title: user.username};
    } catch {
        return {title: "Профиль"};
    }
}

export default async function UserPage(props: { params: Promise<{ id: string }> }) {
    try {
        const params = await props.params;
        const user = await getUserInfo(params.id);
        const session = await getSession();
        return (
            <>
                <div className={"user-card"}>
                    <div className={"user-card-image"}>
                        <Image src={UserIcon} alt={"Юзер"} width={140} height={140}/>
                    </div>
                    <h1 className={"user-card-name"}>{user.username}</h1>
                    <span className={"user-card-role"}>
                        {user.role.value == "ADMIN" && <span style={{color: "red"}}>Администратор</span>}
                        {user.role.value == "USER" && <span style={{color: "green"}}>Пользователь</span>}
                    </span>
                    <p className={"user-card-info"}></p>
                </div>
                <PostsSection userId={params.id} session={session}/>
            </>
        );
    } catch {
        notFound();
    }
}
