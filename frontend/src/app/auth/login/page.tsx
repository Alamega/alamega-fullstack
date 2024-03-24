import {Metadata} from "next";
import LoginForm from "@/app/auth/login/login-form";

export const metadata: Metadata = {
    title: "Вход",
    description: "Вход",
};

export default async function Login() {
    return <>
        <LoginForm/>
    </>
}