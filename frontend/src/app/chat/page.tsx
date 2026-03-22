import {Metadata} from "next";
import Chat from "@/components/chat/chat";
import React from "react";

export const metadata: Metadata = {
    title: "Чат"
};

export default async function ChatPage() {
    return (
        <div style={{maxHeight: "calc(100vh - 166px)"}}>
            <Chat/>
        </div>
    );
}
