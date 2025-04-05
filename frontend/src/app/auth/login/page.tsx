import {Metadata} from "next";
import LoginForm from "@/app/auth/login/login-form";

export const metadata: Metadata = {
    title: "Вход"
};

export default async function LoginPage() {
    return <>
        <LoginForm/>
    </>;
}