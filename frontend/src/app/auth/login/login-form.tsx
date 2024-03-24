"use client"

import {login} from "@/lib";
import {useState} from "react";

export default function LoginForm() {
    const [error, setError] = useState()

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
