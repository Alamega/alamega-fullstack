"use client";

import {FormEvent, useState} from "react";
import {login} from "@/libs/auth";
import {redirect} from "next/navigation";

export default function LoginForm() {
    const [error, setError] = useState<IErrorResponse | null>(null);
    const [isLoading, setLoading] = useState<boolean>(false);

    async function handleLogin(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        setError(null);
        login(new FormData(event.currentTarget)).then(result => {
            setError(result);
            setLoading(false);
            if (!result?.fieldErrors && !result?.message) {
                redirect("/");
            }
        });
    }

    return (
        <>
            <form onSubmit={handleLogin}>
                <label>
                    Имя пользователя: <br/>
                    <input className="input-green" name="username" type="text" autoComplete="username"/>
                </label>
                {error?.fieldErrors?.username && <div className="error">{error?.fieldErrors?.username}</div>}
                <label>Пароль: <br/>
                    <input className="input-green" name="password" type="password" autoComplete="current-password"/>
                </label>
                {error?.fieldErrors?.password && <div className="error">{error?.fieldErrors?.password}</div>}
                <button className="button-green" type="submit" disabled={isLoading}>Войти</button>
            </form>
            {error?.message && <div className="error">{error?.message}</div>}
        </>
    );
}