import {Metadata} from "next";
import Chat from "@/components/chat/chat";
import React from "react";
import {getSession} from "@/libs/auth";

export const metadata: Metadata = {
    title: "Чат"
};

export default async function ChatPage() {
    const session = await getSession();
    return (
        <div style={{maxHeight: "calc(100vh - 166px)"}}>
            <Chat session={session}/>
        </div>
    );
}
