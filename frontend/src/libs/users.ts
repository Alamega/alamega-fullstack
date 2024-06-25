"use server"

import axios from "axios";
import {getSession} from "@/libs/auth";

export async function getUserInfo(id: string): Promise<User> {
    return await axios.get(process.env.NEXT_PUBLIC_API_URL + "/users/" + id)
        .then((response) => {
            return response.data
        })
}

export async function post(formData: FormData) {
    const session = await getSession();
    if (session == null) {
        return null;
    } else {
        axios.post(process.env.NEXT_PUBLIC_API_URL + "/posts", {
            text: formData.get("text")
        }, {
            headers: {
                Authorization: "Bearer " + session.user.token
            }
        }).then(response => {
            //TODO Инфа о посте
        })
    }
}