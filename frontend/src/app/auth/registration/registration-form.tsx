"use client"

import {FormEvent, useState} from "react";
import {registration} from "@/libs/auth";
import Loader from "@/components/loader/loader";

export default function RegistrationForm() {
    const [error, setError] = useState<string | null>();
    const [isLoading, setLoading] = useState<boolean>(false)

    async function handleRegistration(event: FormEvent<HTMLFormElement>) {
        setLoading(true);
        setError(null);
        try {
            setError(await registration(new FormData(event.currentTarget)));
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {!isLoading &&
                <form
                    onSubmit={handleRegistration}
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
            }

            {error && <div className="error">{error}</div>}

            {isLoading && <Loader message={"Загрузка"}/>}
        </>
    )
}
