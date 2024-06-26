import React from "react";

export default async function Post({post}: { post: Post }) {
    return (
        <div>
            <p>{post.date}</p>
            <p>{post.text}</p>
        </div>
    );
}
