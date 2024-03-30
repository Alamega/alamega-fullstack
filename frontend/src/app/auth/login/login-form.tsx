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
            <form style={{display: "flex", flexDirection: "column"}}
                  action={handleLogin}>
                <input className="input-green"
                       name="username" type="text"
                       autoComplete={"username"}
                       placeholder="Логин"/>
                <input className="input-green"
                       name="password" type="password"
                       autoComplete={"current-password"}
                       placeholder="Пароль"/>
                <button className="button-green" type="submit">Войти</button>
            </form>
            {error && <div className="error">{error}</div>}
        </>
    )
}
