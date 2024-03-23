"use client"

import {login} from "@/lib";

export default function LoginForm() {
    return (
        <>
            <form style={{display: "flex", flexDirection: "column"}}
                  action={login}>
                <input className="input-green" name="username" type="text" placeholder="Логин"/>
                <input className="input-green" name="password" type="password" placeholder="Пароль"/>
                <button className="button-green" type="submit">Войти</button>
            </form>
        </>
    )
}
