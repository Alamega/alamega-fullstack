import {Metadata, ResolvingMetadata} from "next";
import {getUserInfo, getUserPosts} from "@/libs/users";
import {getSession} from "@/libs/auth";
import UserPostComponent from "@/components/userPosts/userPostMenu";
import React from "react";
import "./page.css"
import Post from "@/components/post/post";

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
    const posts: Post[] = await getUserPosts(params.id);
    return (
        <>
            <h1>id: {user.id}</h1>
            <h1>username: {user.username}</h1>
            <h1>role: {user.role}</h1>
            {session && session.user.id == user.id &&
                <UserPostComponent/>
            }
            {posts.map((post: Post) => {
                return <Post key={post.id} post={post}/>
            })}
        </>
    )
}
