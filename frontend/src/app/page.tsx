import {Metadata} from "next";
import React from "react";
import Test from "@/app/test";

export const metadata: Metadata = {
    title: "Главная",
    description: "Главная",
};

export default async function Home() {
    return (
        <>
            <p>Страница на стадии разработки, так и знайте!</p>
            <Test/>
        </>
    );
}

