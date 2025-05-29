"use client";

import React, {ChangeEvent, FormEvent, useEffect, useRef, useState} from "react";
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
    const postsRef = useRef<HTMLDivElement>(null);

    //TODO Подтягивать из настроек
    const pageSize: number = 10;

    useEffect(() => {
        getUserPosts(userId, currentPage, pageSize).then(response => {
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
                setCurrentPage(0);
                getUserPosts(userId, currentPage, pageSize).then(response => {
                    setPageablePosts(response);
                });
                if (postsRef.current) {
                    window.scrollTo({
                        top: postsRef.current.getBoundingClientRect().top + window.pageYOffset - 74,
                        behavior: "smooth"
                    });
                }
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
            getUserPosts(userId, currentPage, pageSize).then(response => {
                if (response.content.length === 0 && currentPage > 0) {
                    setCurrentPage(currentPage - 1);
                }
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

            <div id="posts" ref={postsRef}>
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
