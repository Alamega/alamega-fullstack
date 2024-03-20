"use client";

import React, {useState} from 'react';
import axios from 'axios';
import "../auth.css"

export default function RegisterForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://alamega-api.onrender.com";

        await axios.post(API_URL + '/register', {
            username,
            password,
        }).then(response => {
            if (response.status === 200) {
                document.cookie = `token=${response.data.token}; path=/`;
            }
        }).catch(error => {
            setError(error.response.data.message)
        });
    };

    return (
        <>
            <form className={"form_center"} onSubmit={handleSubmit}>
                <input className={"input-green"}
                       type="text"
                       placeholder="Логин"
                       value={username}
                       onChange={(e) => setUsername(e.target.value)}
                />
                <input className={"input-green"}
                       type="password"
                       placeholder="Пароль"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                />
                <button className={"button-green"} type="submit">Зарегистрироваться</button>
            </form>
            {error && <p className={"error"}>{error}</p>}
        </>
    );
}
