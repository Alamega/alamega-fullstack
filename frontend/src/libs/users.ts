"use server";

import {deleteDataFromBackend, getDataFromBackend, postDataToBackend} from "@/libs/server";

export async function getUserInfo(id: string): Promise<IUser> {
    return getDataFromBackend<IUser>(`/users/${id}`).then(user => {
        return user;
    });
}

export async function getUsers(page: number, size: number): Promise<IPageable<IUser>> {
    return getDataFromBackend<IPageable<IUser>>(`/users`, {
        params: {
            page,
            size
        }
    }).then(usersPage => {
        return usersPage;
    });
}

export async function getUserPosts(id: string, page: number, size: number): Promise<IPageable<IPost>> {
    return getDataFromBackend<IPageable<IPost>>(`/users/${id}/posts`, {
        params: {
            page,
            size
        }
    }).then(postsPage => {
        return postsPage;
    });
}

export async function createPost(post: IPost): Promise<IPost> {
    return postDataToBackend<IPost, IPost>("/posts", post).then(post => {
        return post;
    });
}

export async function deletePost(postId: string): Promise<void> {
    return deleteDataFromBackend<void>(`/posts/${postId}`).then(response => {
        return response;
    });
}