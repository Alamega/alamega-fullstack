import {Metadata} from "next";
import React from "react";
import LoginForm from "@/app/login/loginForm";

export const metadata: Metadata = {
    title: "Вход",
    description: "Вход",
};


export default async function Login() {
    return (
        <>
            <LoginForm/>
        </>
    )
}
