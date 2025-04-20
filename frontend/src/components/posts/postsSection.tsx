"use client";

import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {createPost, deletePost, getUserPosts} from "@/libs/users";
import "./postsSection.css";
import Pagination from "@/components/pagination/pagination";
import Post from "@/components/posts/post/post";

export default function PostsSection({userId, session}: {
    userId: string,
    session: ISession | null
}) {
    const [pageablePosts, setPageablePosts] = useState<IPageablePostResponse>();
    const [currentPage, setCurrentPage] = useState(0);
    const [formData, setFormData] = useState({text: ""});
    const [formButtonText, setFormButtonText] = useState("Опубликовать");
    const [errors, setErrors] = useState("");
    const isPageOwner: boolean = session?.user.id === userId;
    const currentUserIsAdmin: boolean = session?.user.role.value === "ADMIN";

    useEffect(() => {
        getUserPosts(userId, currentPage, 20).then(response => {
            setPageablePosts(response);
        }).then();
    }, [userId, currentPage]);

    async function handlePost(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setErrors("");
        if (formData.text.trim().length > 0) {
            setFormButtonText("Публикуем...");
            await createPost({
                text: formData.text
            }).then(async () => {
                setFormData({text: ""});
                setFormButtonText("Опубликовать");
                getUserPosts(userId, currentPage, 20).then(response => {
                    setPageablePosts(response);
                });
            });
        } else {
            setErrors("Сообщение пустое!");
        }
    }

    function handlePostForm(event: ChangeEvent<HTMLTextAreaElement>) {
        setFormData(prevState => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            };
        });
    }

    async function handlePostDeleted(postId: string) {
        await deletePost(postId).then(() => {
            getUserPosts(userId, currentPage, 20).then(response => {
                setPageablePosts(response);
            });
        });
    }

    async function handlePageChange(page: number) {
        setCurrentPage(page);
    }

    return (
        <>
            {isPageOwner && (
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
                {pageablePosts?.content.map((post: IPost) => {
                    return <Post key={post.id} post={post} deletePost={handlePostDeleted} isPageOwner={isPageOwner}
                                 currentUserIsAdmin={currentUserIsAdmin}/>;
                })}
            </div>

            <Pagination
                pageable={pageablePosts}
                onPageChange={handlePageChange}/>
        </>
    );
}
