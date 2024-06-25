import {Metadata, ResolvingMetadata} from "next";
import {getUserInfo} from "@/libs/users";
import {getSession} from "@/libs/auth";
import UserPosts from "@/components/userPosts/userPosts";
import React from "react";

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
            <p>id: {user.id}</p>
            <p>username: {user.username}</p>
            <p>role: {user.role}</p>
            {session && session.user.id == user.id && <UserPosts/>}
        </>
    )
}
