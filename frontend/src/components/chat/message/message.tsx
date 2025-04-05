"use client";

import React from "react";
import "./message.css";

export default function ChatMessage({message}: { message: { author: string, text: string } }) {
    return (
        <div className={"chat-message"}>
            <div className={"chat-author"}>{message.author}:</div>
            <div className={"chat-text"}>{message.text}</div>
        </div>
    );
};