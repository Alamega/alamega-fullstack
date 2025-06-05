"use client"

import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {createPost, deletePost, getUserPosts} from "@/libs/users";
import "./postsSection.css";
import Post from "@/components/posts/post/post";
import PaginatedList from "@/components/pagination/paginatedList";

export default function PostsSection({userId, session}: {
    userId: string;
    session: ISession | null;
}) {
    const [pageablePosts, setPageablePosts] = useState<IPageable<IPost>>();
    const [currentPage, setCurrentPage] = useState(0);
    const [formData, setFormData] = useState({text: ""});
    const [formButtonText, setFormButtonText] = useState("Опубликовать");
    const [errors, setErrors] = useState("");

    const isPageOwner = session?.user.id === userId;
    const currentUserIsAdmin = session?.user.role.value === "ADMIN";

    const pageSize = 10;

    useEffect(() => {
        getUserPosts(userId, currentPage, pageSize).then(setPageablePosts);
    }, [userId, currentPage]);

    async function handlePost(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setErrors("");
        if (formData.text.trim().length > 0) {
            setFormButtonText("Публикуем...");
            await createPost({text: formData.text}).then(async () => {
                setFormData({text: ""});
                setFormButtonText("Опубликовать");
                setCurrentPage(0);
                getUserPosts(userId, currentPage, pageSize).then(setPageablePosts);
            });
        } else {
            setErrors("Сообщение пустое!");
        }
    }

    function handlePostForm(event: ChangeEvent<HTMLTextAreaElement>) {
        setFormData((prev) => ({...prev, [event.target.name]: event.target.value}));
    }

    async function handlePostDeleted(postId: string) {
        await deletePost(postId).then(() => {
            getUserPosts(userId, currentPage, pageSize).then((response) => {
                if (response.content.length === 0 && currentPage > 0) {
                    setCurrentPage(currentPage - 1);
                }
                setPageablePosts(response);
            });
        });
    }

    return (
        <>
            {isPageOwner && (
                <form onSubmit={handlePost} className="post-form">
                    <textarea
                        onChange={handlePostForm}
                        value={formData.text}
                        className="input-green"
                        name="text"
                        rows={5}
                        maxLength={2048}
                    />
                    <button className="button-green" type="submit">
                        {formButtonText}
                    </button>
                </form>
            )}

            {errors && <div className="error">{errors}</div>}

            <PaginatedList
                pageable={pageablePosts}
                onPageChangeAction={setCurrentPage}
                renderItem={(post: IPost) =>
                    <Post key={post.id} post={post} deletePost={handlePostDeleted} isPageOwner={isPageOwner}
                          currentUserIsAdmin={currentUserIsAdmin}/>
                }
            />
        </>
    );
}
