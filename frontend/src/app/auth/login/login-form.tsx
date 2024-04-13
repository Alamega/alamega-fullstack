"use client"

import {useState} from "react";
import {login} from "@/libs/auth";

export default function LoginForm() {
    const [error, setError] = useState<string>()

    async function handleLogin(formData: FormData) {
        setError(await login(formData));
    }

    return (
        <>
            <form
                action={handleLogin}>
                <label>Имя пользователя: <br/>
                    <input className="input-green" name="username" type="text" autoComplete={"username"}/>
                </label>

                <label>Пароль: <br/>
                    <input className="input-green" name="password" type="password" autoComplete={"current-password"}/>
                </label>

                <button className="button-green" type="submit">Войти</button>
            </form>
            {error && <div className="error">{error}</div>}
        </>
    )
}
