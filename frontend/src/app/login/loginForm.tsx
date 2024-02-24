"use client";

import React, {useState} from 'react';
import axios from 'axios';
import "../auth.css"

export default function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/login', {
                username,
                password,
            });
            if (response.status === 200) {
            } else {
                setError('Неверный логин или пароль');
            }
        } catch (err) {
            setError('Ошибка при авторизации');
        }
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
                <button className={"button-green"} type="submit">Войти</button>
            </form>
            {error && <p className={"error"}>{error}</p>}
        </>
    );
}
