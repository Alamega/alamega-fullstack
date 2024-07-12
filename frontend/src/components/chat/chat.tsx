"use client"

import React, {ChangeEvent, FormEvent, useState} from "react";

export default function Chat({session}: { session: ISession | null }) {
    interface Message {
        author: string,
        text: string
    }

    const [messages, setMessages] = useState<Message[]>([]);
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [formData, setFormData] = useState({text: ""});
    const [errors, setErrors] = useState("");

    if (!socket) {
        setSocket(new WebSocket('ws://localhost:8080/chat'))
    } else {
        socket.onmessage = (event) => {
            setMessages(prevState => [...prevState, JSON.parse(event.data)])
        }
    }

    const handleSend = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrors("");
        if (formData.text.trim().length > 0) {
            socket?.send(JSON.stringify({
                author: session ? session.user.username : "Гость",
                text: formData.text
            }))
        } else {
            setErrors("Сообщение пустое!")
        }
    }

    function handleSendForm(event: ChangeEvent<HTMLTextAreaElement>) {
        setFormData(prevState => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        })
    }

    return (
        <div>
            <form onSubmit={handleSend} className={"post-form"}>
                <textarea onChange={handleSendForm} value={formData?.text} className="input-green"
                          name="text"
                          rows={5}
                          maxLength={1024}
                />
                <button className="button-green" type="submit">Отправить</button>
            </form>
            {errors && <div className="error">{errors}</div>}
            {messages.slice().reverse().map((message, index) => (
                <div key={index}>{message.author}: {message.text}</div>
            ))}
        </div>
    );
};