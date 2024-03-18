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

        try {
            const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/register', {
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
                <button className={"button-green"} type="submit">Зарегистрироваться</button>
            </form>
            {error && <p className={"error"}>{error}</p>}
        </>
    );
}
