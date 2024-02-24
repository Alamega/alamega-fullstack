import React from "react";
import type {Metadata} from "next";

import "./globals.css";
import {Ubuntu} from "next/font/google";

import Link from "next/link";

import Navbar from "@/components/navbar/navbar";
import Menu from "@/components/menu";
import Clock from "@/components/clock/clock";

const ubuntuFont = Ubuntu({
    weight: ["300"],
    style: "normal",
    subsets: ["cyrillic"],
    display: "swap"
});

export const metadata: Metadata = {
    title: "title",
    description: "description",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru">
        <body className={ubuntuFont.className}>
        <header>
            <Link href="/">
                <h1>Alamega</h1>
            </Link>
            <Clock/>
            <Navbar/>
        </header>

        <div className="full-wrapper">
            <div className="content">
                {children}
            </div>

            <div className="sidebar">
                <Menu/>
            </div>
        </div>

        <footer>
            <p>© Made by <a target="_blank" href="https://github.com/Alamega">Alamega</a></p>
        </footer>
        </body>
        </html>
    );
}