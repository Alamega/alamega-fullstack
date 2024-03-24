import {Metadata} from "next";
import RegistrationForm from "@/app/auth/registration/registration-form";

export const metadata: Metadata = {
    title: "Регистрация",
    description: "Регистрация",
};

export default async function Registration() {
    return <>
        <RegistrationForm/>
    </>;
}
