"use client"

import {useState} from "react";
import Loader from "@/components/loader/loader";
import {login} from "@/libs/auth";

export default function LoginForm() {
    const [error, setError] = useState<string>()
    const [isLoading, setLoading] = useState<boolean>(false)

    async function handleLogin(formData: FormData) {
        setLoading(true)
        login(formData).then((errMessage) => {
            setError(errMessage);
        })
        setLoading(false)
    }

    return (
        <>
            {!isLoading &&
                <form
                    action={handleLogin}>
                    <label>Имя пользователя: <br/>
                        <input className="input-green" name="username" type="text" autoComplete={"username"}/>
                    </label>

                    <label>Пароль: <br/>
                        <input className="input-green" name="password" type="password"
                               autoComplete={"current-password"}/>
                    </label>

                    <button className="button-green" type="submit">Войти</button>
                </form>
            }

            {isLoading && <Loader/>}

            {error && <div className="error">{error}</div>}
        </>
    )
}
