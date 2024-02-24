import {Metadata} from "next";
import RegisterForm from "@/app/registration/registerForm";

export const metadata: Metadata = {
    title: "Регистрация",
    description: "Регистрация",
};

export default async function Registration() {
    return <><RegisterForm/></>;
}
