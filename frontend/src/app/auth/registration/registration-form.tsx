"use client"

import {registration} from "@/lib";
import {useState} from "react";

export default function RegistrationForm() {
    const [error, setError] = useState<string>()

    async function handleRegistration(formData: FormData) {
        setError(await registration(formData));
    }

    return (
        <>
            <form style={{display: "flex", flexDirection: "column"}}
                  action={handleRegistration}>
                <input className="input-green"
                       name="username" type="text"
                       autoComplete={"username"}
                       placeholder="Логин"/>
                <input className="input-green"
                       name="password" type="password"
                       autoComplete={"current-password"}
                       placeholder="Пароль"/>
                <button className="button-green" type="submit">Зарегистрироваться</button>
            </form>
            {error && <div className="error">{error}</div>}
        </>
    )
}
