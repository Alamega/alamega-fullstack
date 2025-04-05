"use server";

import {deleteDataFromBackend, fetchDataFromBackend, postDataToBackend} from "@/libs/server";

export async function getUserInfo(id: string): Promise<IUser> {
    return fetchDataFromBackend(`/users/${id}`).then(response => {
        return response.data;
    });
}

export async function getUserPosts(id: string, page: number, size: number): Promise<IPageablePostResponse> {
    return fetchDataFromBackend(`/users/${id}/posts`, {
        params: {
            page,
            size
        }
    }).then(response => {
        return response.data;
    });
}

export async function createPost(post: IPost): Promise<IPost> {
    return postDataToBackend("/posts", post).then(response => {
        return response.data;
    });
}

export async function deletePost(postId: string): Promise<void> {
    return deleteDataFromBackend(`/posts/${postId}`).then(response => {
        return response.data;
    });
}