import React from "react";
import "./post.css";

export default function Post({post}: { post: IPost }) {
    const date: Date = new Date(Date.parse(post.date ? post.date : Date.now().toString()));
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const dateString = `${hours}:${minutes} ${day}.${month}.${date.getFullYear()}`
    return (
        <div className={"post-wrapper"}>
            <p className={"post-date"}>{dateString}</p>
            <p className={"post-text"}>{post.text}</p>
        </div>
    );
}