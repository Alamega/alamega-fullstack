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
                <label>Имя пользователя: <br/>
                    <input className="input-green" name="username" type="text"/>
                </label>
                
                <label>Пароль: <br/>
                    <input className="input-green" name="password" type="password"/>
                </label>

                <button className="button-green" type="submit">Зарегистрироваться</button>
            </form>
            {error && <div className="error">{error}</div>}
        </>
    )
}
