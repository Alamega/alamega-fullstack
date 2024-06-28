import {Metadata, ResolvingMetadata} from "next";
import {getUserInfo, getUserPosts} from "@/libs/users";
import {getSession} from "@/libs/auth";
import UserPosts from "@/components/userPosts/userPosts";
import React from "react";
import "./page.css"

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
    const posts = await getUserPosts(params.id);

    return (
        <>
            <h1>id: {user.id}</h1>
            <h1>username: {user.username}</h1>
            <h1>role: {user.role}</h1>
            <UserPosts userId={params.id} session={session} posts={posts}/>
        </>
    );
}