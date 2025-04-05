import React from "react";
import "./post.css";
import Image from "next/image";

export default function Post({post, deletePost}: { post: IPost, deletePost: (postId: string) => void; }) {
    const date: Date = new Date(Date.parse(post.date ? post.date : Date.now().toString()));
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const dateString = `${hours}:${minutes} ${day}.${month}.${date.getFullYear()}`;

    function handlePostDelete() {
        if (post.id) {
            deletePost(post.id);
        }
    }

    return (
        <div className={"post-wrapper"}>
            <div className={"post-header"}>
                <span>{dateString}</span>
                <Image src={"/images/delete.png"}
                       alt={"Удалить"}
                       onClick={handlePostDelete}
                       width={20} height={20}
                       className="post-delete-button"/>
            </div>
            <p className={"post-content"}>{post.text}</p>
        </div>
    );
}