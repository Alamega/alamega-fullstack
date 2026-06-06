"use client"

import React, {useActionState, useEffect, useRef, useState} from "react";
import {createPost, deletePost, getUserPosts} from "@/libs/users";
import "./postsSection.css";
import Post from "@/components/posts/post/post";
import PaginatedList from "@/components/pagination/paginatedList";
import ButtonWithLoader from "@/components/buttonWithLoader/buttonWithLoader";
import {useSession} from "@/providers/SessionProvider";

interface FormState {
    error: string;
    success?: number;
}

export default function PostsSection({userId}: {
    userId: string;
}) {
    const [pageablePosts, setPageablePosts] = useState<IPageable<IPost>>();
    const [currentPage, setCurrentPage] = useState(0);
    const formRef = useRef<HTMLFormElement>(null);

    const session = useSession();

    const isPageOwner = session?.user.id === userId;
    const currentUserIsAdmin = session?.user.role.value === "ADMIN";
    const pageSize = 10;

    async function handlePostAction(prevState: FormState, formData: FormData): Promise<FormState> {
        const text = formData.get("text") as string;
        if (!text.trim()) return {error: "Сообщение пустое!"};
        try {
            await createPost({text});
            formRef.current?.reset();
            setCurrentPage(0);
            return {error: "", success: Date.now()};
        } catch {
            return {error: "Ошибка при создании поста", success: undefined};
        }
    }

    const [state, formAction, isPending] = useActionState(handlePostAction, {error: ""});

    useEffect(() => {
        let ignore = false;
        getUserPosts(userId, currentPage, pageSize).then((res) => {
            if (!ignore) setPageablePosts(res);
        });
        return () => {
            ignore = true;
        };
    }, [userId, currentPage, pageSize, state?.success]);

    async function handlePostDeleted(postId: string) {
        await deletePost(postId);
        const response = await getUserPosts(userId, currentPage, pageSize);

        if (response.content.length === 0 && currentPage > 0) {
            setCurrentPage(currentPage - 1);
        } else {
            setPageablePosts(response);
        }
    }

    return (
        <>
            {isPageOwner && (
                <form action={formAction} ref={formRef} className="post-form">
                    <textarea
                        className="input-green"
                        name="text"
                        rows={5}
                        maxLength={2048}
                        disabled={isPending}
                        style={{margin: "8px 0"}}
                    />
                    <ButtonWithLoader loading={isPending}>
                        Опубликовать
                    </ButtonWithLoader>
                </form>
            )}

            {state?.error && <div className="error" style={{color: 'red'}}>{state.error}</div>}

            <PaginatedList
                pageable={pageablePosts}
                onPageChangeAction={setCurrentPage}
                renderItemAction={(post: IPost) => (
                    <Post
                        key={post.id}
                        post={post}
                        deletePost={handlePostDeleted}
                        isPageOwner={isPageOwner}
                        currentUserIsAdmin={currentUserIsAdmin}
                    />
                )}
            />
        </>
    );
}
