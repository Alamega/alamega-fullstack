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
            const response = await axios.post('http://localhost:8080/authenticate', {
                username,
                password,
            });
            console.log(response);
            console.log(response.data.token);
            if (response.status === 200) {
                // Обработка успешной регистрации
            } else {
                setError('Ошибка при регистрации');
            }
        } catch (err) {
            setError('Ошибка при регистрации');
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
