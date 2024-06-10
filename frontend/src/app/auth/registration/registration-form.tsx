"use client"

import {useState} from "react";
import {registration} from "@/libs/auth";
import Loader from "@/components/loader/loader";

export default function RegistrationForm() {
    const [error, setError] = useState<string>()
    const [isLoading, setLoading] = useState<boolean>(false)

    async function handleRegistration(formData: FormData) {
        setLoading(true)
        registration(formData).then((errMessage) => {
            setError(errMessage);
        })
        setLoading(false)
    }

    return (
        <>
            {!isLoading &&
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
            }
            {isLoading && <Loader/>}
            {error && <div className="error">{error}</div>}
        </>
    )
}
