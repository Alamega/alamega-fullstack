"use client";

import React from "react";
import "./message.css";
import Link from "next/link";

export default function ChatMessage({message}: { message: IMessage }) {
    return (
        <div className={"chat-message"}>
            {message.author ? (
                <Link className={"chat-author"} href={"/users/" + message.author.id}>{message.author.username}: </Link>
            ) : (
                <div className={"chat-author"}>Гость:</div>
            )}
            <div className={"chat-text"}>{message.text}</div>
        </div>
    );
};