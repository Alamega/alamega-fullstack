"use client";

import React, {useState} from "react";
import {registration} from "@/libs/auth";
import {redirect} from "next/navigation";
import ButtonWithLoader from "@/components/buttonWithLoader/buttonWithLoader";
import FieldErrorMessages from "@/components/fieldErrors/fieldErrors";

export default function RegistrationForm() {
    const [error, setError] = useState<IErrorResponse | null>(null);
    const [isLoading, setLoading] = useState<boolean>(false);

    async function handleRegistration(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        setError(null);
        registration(new FormData(event.currentTarget)).then(result => {
            setError(result);
            setLoading(false);
            if (!result?.fieldErrors && !result?.message) {
                redirect("/");
            }
        });
    }

    return (
        <>
            <form
                onSubmit={handleRegistration}
                autoComplete={"off"}
            >
                <label>Имя пользователя: <br/>
                    <input className="input-green" name="username" type="text" autoComplete="username"
                           style={{margin: "8px 0"}}/>
                </label>
                <FieldErrorMessages errorMessages={error?.fieldErrors?.username}/>
                <label>Пароль: <br/>
                    <input className="input-green" name="password" type="password" autoComplete="new-password"
                           style={{margin: "8px 0"}}/>
                </label>
                <FieldErrorMessages errorMessages={error?.fieldErrors?.password}/>
                <ButtonWithLoader loading={isLoading}>Зарегистрироваться</ButtonWithLoader>
            </form>
            {error?.message && <div className="error">{error?.message}</div>}
        </>
    );
}
