"use client"

import React, {FormEvent} from "react";
import {post} from "@/libs/users";

export default function UserPostMenu() {
    async function handlePost(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        await post(new FormData(event.currentTarget));
    }

    return (
        <>
            <form onSubmit={handlePost}>
                <label>
                    Текст: <br/>
                    <textarea className="input-green" name="text" rows={7} maxLength={1024}/>
                </label>
                <button className="button-green" type="submit">
                    Опубликовать
                </button>
            </form>
        </>
    );
}
