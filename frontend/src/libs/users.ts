"use server"

import axios from "axios";
import {getSession} from "@/libs/auth";

export async function getUserInfo(id: string): Promise<IUser> {
    return await axios.get(process.env.NEXT_PUBLIC_API_URL + `/users/${id}`)
        .then((response) => {
            return response.data
        })
}

export async function getUserPosts(id: string): Promise<IPost[]> {
    return await axios.get(process.env.NEXT_PUBLIC_API_URL + `/users/${id}/posts`)
        .then((response) => {
            return response.data
        })
}
 
export async function createPost(post: IPost): Promise<IPost> {
    const session = await getSession();
    return axios.post(process.env.NEXT_PUBLIC_API_URL + "/posts", post, {
        headers: {
            Authorization: "Bearer " + session?.user.token
        }
    }).then(response => {
        return response.data as IPost;
    })
}