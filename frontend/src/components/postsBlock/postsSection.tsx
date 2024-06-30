"use client"

import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import Post from "@/components/post/post";
import {createPost, getUserPosts} from "@/libs/users";
import "./postsSection.css"

export default function PostsSection({userId, session}: {
    userId: string,
    session: ISession | null
}) {
    const [posts, setPosts] = useState<IPost[]>([]);
    const [formData, setFormData] = useState({text: ""});
    const [formButtonIsDisabled, setFormButtonIsDisabled] = useState(false);
    const fetchPosts = async () => {
        const posts = await getUserPosts(userId);
        setPosts(posts)
    }

    useEffect(() => {
        fetchPosts().then();
    })

    const handlePost = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormButtonIsDisabled(true)
        await createPost({
            text: formData.text
        }).then(async () => {
            setFormData({text: ""})
            await fetchPosts()
        }).finally(() => {
            setFormButtonIsDisabled(false)
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
                    <textarea onChange={handlePostForm} value={formData?.text} className="input-green"
                              name="text"
                              rows={5}
                              maxLength={1024}
                    />
                    <button disabled={formButtonIsDisabled} className="button-green" type="submit">
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
