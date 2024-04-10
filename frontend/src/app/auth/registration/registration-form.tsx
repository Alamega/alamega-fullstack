"use client"

import {useState} from "react";
import {registration} from "@/libs/auth";

export default function RegistrationForm() {
    const [error, setError] = useState<string>()

    async function handleRegistration(formData: FormData) {
        setError(await registration(formData));
    }

    return (
        <>
            <form
                action={handleRegistration}
                autoComplete={"off"}
            >
                <input className="input-green"
                       autoComplete={"off"}
                       name="username" type="text"
                       placeholder="Логин"
                />
                <input className="input-green"
                       autoComplete={"off"}
                       name="password" type="password"
                       placeholder="Пароль"
                />
                <button className="button-green" type="submit">Зарегистрироваться</button>
            </form>
            {error && <div className="error">{error}</div>}
        </>
    )
}
