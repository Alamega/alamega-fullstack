"use client"

import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import Post from "@/components/posts/post/post";
import {createPost, deletePost, getUserPosts} from "@/libs/users";
import "./postsSection.css"
import Loader from "@/components/loader/loader";

export default function PostsSection({userId, session}: {
    userId: string,
    session: ISession | null
}) {
    const [posts, setPosts] = useState<IPost[]>([]);
    const [postsLoaded, setPostsLoaded] = useState<boolean>(false);
    const [formData, setFormData] = useState({text: ""});
    const [formButtonText, setFormButtonText] = useState("Опубликовать");
    const [errors, setErrors] = useState("");

    async function fetchPosts() {
        const posts = await getUserPosts(userId);
        setPosts(posts)
    }

    useEffect(() => {
        fetchPosts().then(() => {
            setPostsLoaded(true);
        });
    }, [])

    async function handlePost(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setErrors("");
        if (formData.text.trim().length > 0) {
            setFormButtonText("Публикуем...")
            await createPost({
                text: formData.text
            }).then(async () => {
                setFormData({text: ""})
                setFormButtonText("Опубликовать")
                await fetchPosts()
            })
        } else {
            setErrors("Сообщение пустое!")
        }
    }

    function handlePostForm(event: ChangeEvent<HTMLTextAreaElement>) {
        setFormData(prevState => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        })
    }

    async function handlePostDeleted(postId: string) {
        setPostsLoaded(false)
        await deletePost(postId).then(() => {
            fetchPosts().then(() => {
                setPostsLoaded(true);
            });
        });
    }

    return (
        <>
            {session && session.user.id == userId && (
                <>
                    <form onSubmit={handlePost} className={"post-form"}>
                    <textarea onChange={handlePostForm} value={formData?.text} className="input-green"
                              name="text"
                              rows={5}
                              maxLength={1024}
                    />
                        <button className="button-green" type="submit">
                            {formButtonText}
                        </button>
                    </form>
                    {errors && <div className="error">{errors}</div>}
                </>
            )}

            {postsLoaded ? (
                <div id="posts">
                    {posts.map((post: IPost) => {
                        return <Post key={post.id} post={post} deletePost={handlePostDeleted}/>;
                    })}
                </div>
            ) : (
                <div>
                    <Loader message={"Загружаю посты"}/>
                </div>
            )}
        </>
    )
}
