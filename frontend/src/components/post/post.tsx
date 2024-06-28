import React from "react";

export default function Post({post}: { post: IPost }) {
    return (
        <div>
            <p>{post.date}</p>
            <p>{post.text}</p>
        </div>
    );
}
