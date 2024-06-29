"use client"

import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import Post from "@/components/post/post";
import {createPost, getUserPosts} from "@/libs/users";

export default function UserPosts({userId, session}: {
    userId: string,
    session: ISession | null
}) {
    const [posts, setPosts] = useState<IPost[]>([]);
    const [formData, setFormData] = useState<{ text?: string } | null>(null);
    const [formButtonIsDisable, setFormButtonIsDisable] = useState(false);
    const fetchPosts = async () => {
        const posts = await getUserPosts(userId);
        setPosts(posts)
    }

    useEffect(() => {
        fetchPosts().then();
    })

    const handlePost = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormButtonIsDisable(true)
        await createPost({
            text: formData?.text
        }).then(async () => {
            setFormData({text: ""})
            await fetchPosts()
        }).finally(() => {
            setFormButtonIsDisable(false)
        });
    }

    function handlePostForm(event: ChangeEvent<HTMLTextAreaElement>) {
        setFormData(prevState => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        })
    }

    return (
        <>
            {session && session.user.id == userId && (
                <form onSubmit={handlePost}>
                    <label>
                        Текст: <br/>
                        <textarea onChange={handlePostForm} value={formData?.text} className="input-green"
                                  name="text"
                                  rows={7}
                                  maxLength={1024}
                        />
                    </label>
                    <button disabled={formButtonIsDisable} className="button-green" type="submit">
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
