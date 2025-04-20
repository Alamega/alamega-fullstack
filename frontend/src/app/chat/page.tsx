import {Metadata} from "next";
import Chat from "@/components/chat/chat";
import React from "react";
import {getSession} from "@/libs/auth";
import {getBackendURL} from "@/libs/server";

export const metadata: Metadata = {
    title: "Чат"
};

export default async function ChatPage() {
    const session = await getSession();
    const backendURL = await getBackendURL();
    return (
        <>
            <Chat session={session} backendURL={backendURL}/>
        </>
    );
}
