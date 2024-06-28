"use server"

import axios from "axios";

export async function getUserInfo(id: string): Promise<User> {
    return await axios.get(process.env.NEXT_PUBLIC_API_URL + "/users/" + id)
        .then((response) => {
            return response.data
        })
}

export async function getUserPosts(id: string): Promise<Post[]> {
    return await axios.get(process.env.NEXT_PUBLIC_API_URL + "/users/" + id + "/posts")
        .then((response) => {
            return response.data
        })
}