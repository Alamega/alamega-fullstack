"use server";

import {deleteDataFromBackend, getDataFromBackend, postDataToBackend} from "@/libs/server";

export async function getUserInfo(id: string): Promise<IUser> {
    return await getDataFromBackend<IUser>(`/users/${id}`);
}

export async function getUsers(page: number, size: number): Promise<IPageable<IUser>> {
    return await getDataFromBackend<IPageable<IUser>>(`/users`, {
        params: {page, size}
    });
}

export async function getUserPosts(id: string, page: number, size: number): Promise<IPageable<IPost>> {
    return await getDataFromBackend<IPageable<IPost>>(`/users/${id}/posts`, {
        params: {page, size}
    });
}

export async function createPost(post: IPost): Promise<IPost> {
    return await postDataToBackend<IPost, IPost>("/posts", post);
}

export async function deletePost(postId: string): Promise<void> {
    return await deleteDataFromBackend<void>(`/posts/${postId}`);
}
