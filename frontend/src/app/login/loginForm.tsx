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
            if (response.status === 200) {
                const userInfo = await axios.get('http://localhost:8080/userinfo/' + response.data.token);
                console.log(userInfo.data.username)
            } else {
                setError('Ошибка при входе');
            }
        } catch (err) {
            setError('Ошибка при входе');
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
