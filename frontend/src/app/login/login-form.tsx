"use client"

import {login} from "@/lib";

export default function LoginForm() {
    return (
        <>
            <form style={{display: "flex", flexDirection: "column"}}
                  action={login}>
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
        </>
    )
}
