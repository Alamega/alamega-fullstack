import {Metadata} from "next";
import React from "react";
import UseModalExample from "@/components/modal/example";

export const metadata: Metadata = {
    title: "Тест"
};

export default async function ChatPage() {
    return (
        <>
            <UseModalExample/>
        </>
    );
}
