"use client"

import React, {FormEvent, useEffect, useState} from "react";
import Post from "@/components/post/post";
import axios from "axios";
import {getUserPosts} from "@/libs/users";

export default function UserPosts({userId, session}: {
    userId: string,
    session: ISession | null
}) {
    const [posts, setPosts] = useState<IPost[]>([]);

    const fetchPosts = async () => {
        const posts = await getUserPosts(userId);
        setPosts(posts)
    }

    useEffect(() => {
        fetchPosts().then();
    })

    const handlePost = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await axios.post("/api/posts", {
            text: new FormData(event.currentTarget).get("text")
        }).then(async () => {
            await fetchPosts()
        })
    }

    return (
        <>
            {session && session.user.id == userId && (
                <form onSubmit={handlePost}>
                    <label>
                        Текст: <br/>
                        <textarea className="input-green" name="text"
                                  rows={7}
                                  maxLength={1024}
                        />
                    </label>
                    <button className="button-green" type="submit">
                        Опубликовать
                    </button>
                </form>
            )}
            <div id="posts">
                {posts.map((post: IPost) => {
                    return <Post key={post.id} post={post}/>;
                })}
            </div>
        </>
    );
}
