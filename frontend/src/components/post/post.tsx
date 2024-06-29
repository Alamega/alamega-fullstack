import React from "react";

export default function Post({post}: { post: IPost }) {
    const date: Date = new Date(Date.parse(post.date));
    const dateString = `${date.getHours()}:${date.getMinutes()} ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
    return (
        <div>
            <p>{dateString}</p>
            <p>{post.text}</p>
        </div>
    );
}
