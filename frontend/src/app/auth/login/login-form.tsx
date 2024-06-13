"use client"

import {FormEvent, useState} from "react";
import Loader from "@/components/loader/loader";
import {login} from "@/libs/auth";

export default function LoginForm() {
    const [error, setError] = useState<string>();
    const [isLoading, setLoading] = useState<boolean>(false);

    async function handleLogin(event: FormEvent<HTMLFormElement>) {
        setLoading(true);
        try {
            setError(await login(new FormData(event.currentTarget)));
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {!isLoading &&
                <form onSubmit={handleLogin}>
                    <label>
                        Имя пользователя: <br/>
                        <input className="input-green" name="username" type="text" autoComplete="username"/>
                    </label>

                    <label>
                        Пароль: <br/>
                        <input className="input-green" name="password" type="password" autoComplete="current-password"/>
                    </label>

                    <button className="button-green" type="submit">
                        Войти
                    </button>
                </form>
            }

            {error && <div className="error">{error}</div>}

            {isLoading && <Loader/>}
        </>
    );
}