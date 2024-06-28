"use client"

import React, {FormEvent} from "react";
import Post from "@/components/post/post";
import axios from "axios";


export default function UserPosts({userId, session, posts}: {
    userId: string,
    session: Session | null,
    posts: Post[]
}) {
    function handlePost(event: FormEvent<HTMLFormElement>) {
        axios.post("/api/posts", {
            text: new FormData(event.currentTarget).get("text")
        }).then(r => {
        })
    }

    return (
        <>
            {session && session.user.id == userId && (
                <form onSubmit={handlePost}>
                    <label>
                        Текст: <br/>
                        <textarea className="input-green" name="text" rows={7} maxLength={1024}/>
                    </label>
                    <button className="button-green" type="submit">
                        Опубликовать
                    </button>
                </form>
            )}
            <div id="posts">
                {posts.map((post: Post) => {
                    return <Post key={post.id} post={post}/>;
                })}
            </div>
        </>
    );
}
