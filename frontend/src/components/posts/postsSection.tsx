"use client"

import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import Post from "@/components/posts/post/post";
import {createPost, deletePost, getUserPosts} from "@/libs/users";
import "./postsSection.css"
import Pagination from "@/components/pagination/pagination";

export default function PostsSection({userId, session}: {
    userId: string,
    session: ISession | null
}) {
    const [posts, setPosts] = useState<IPost[]>([]);
    const [formData, setFormData] = useState({text: ""});
    const [formButtonText, setFormButtonText] = useState("Опубликовать");
    const [errors, setErrors] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(20);
    const [totalPosts, setTotalPosts] = useState(0);
    const totalPages = Math.ceil(totalPosts / postsPerPage);

    async function fetchPosts(page: number, limit: number) {
        getUserPosts(userId, page, limit).then(response => {
            setPosts(response.content);
            setTotalPosts(response.totalElements);
        });
    }

    useEffect(() => {
        fetchPosts(currentPage, postsPerPage).then();
    }, [currentPage])

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
                await fetchPosts(currentPage, postsPerPage)
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
        await deletePost(postId).then(() => {
            fetchPosts(currentPage, postsPerPage).then();
        });
    }

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            {session && session.user.id == userId && (
                <>
                    <form onSubmit={handlePost} className={"post-form"}>
                    <textarea onChange={handlePostForm} value={formData?.text} className="input-green"
                              name="text"
                              rows={5}
                              maxLength={2048}
                    />
                        <button className="button-green" type="submit">
                            {formButtonText}
                        </button>
                    </form>
                    {errors && <div className="error">{errors}</div>}
                </>
            )}

            <div id="posts">
                {posts.map((post: IPost) => {
                    return <Post key={post.id} post={post} deletePost={handlePostDeleted}/>;
                })}
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </>
    )
}
