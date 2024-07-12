import {Metadata} from "next";
import Chat from "@/components/chat/chat";
import React from "react";
import {getSession} from "@/libs/auth";
import {getServerUrl} from "@/libs/server";

export const metadata: Metadata = {
    title: "Чат"
};

export default async function ChatPage() {
    const session: ISession | null = await getSession();
    const serverURL = await getServerUrl();
    return (
        <>
            <Chat session={session} serverUrl={serverURL}/>
        </>
    );
}
