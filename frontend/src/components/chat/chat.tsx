"use client";

import React, {ChangeEvent, FormEvent, useState} from "react";
import ChatMessage from "@/components/chat/message/message";

export default function Chat({session, serverUrl}: { session: ISession | null, serverUrl: string }) {
    interface Message {
        author: string,
        text: string
    }

    const [messages, setMessages] = useState<Message[]>([]);
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [formData, setFormData] = useState({text: ""});
    const [errors, setErrors] = useState("");
    const wsURL = serverUrl.replace("http", "ws") + "/chat";

    if (!socket) {
        setSocket(new WebSocket(wsURL));
    } else {
        socket.onmessage = (event) => {
            setMessages((prevState) => {
                const newMessages = [...prevState, JSON.parse(event.data)];
                return newMessages.slice(-25);
            });
        };
    }

    const handleSend = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrors("");
        if (formData.text.trim().length > 0) {
            socket?.send(JSON.stringify({
                author: session ? session.user.username : "Гость",
                text: formData.text
            }));
            setFormData({text: ""});
        } else {
            setErrors("Сообщение пустое!");
        }
    };

    function handleSendForm(event: ChangeEvent<HTMLTextAreaElement>) {
        setFormData(prevState => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            };
        });
    }

    return (
        <div>
            <form onSubmit={handleSend} className={"post-form"}>
                <textarea onChange={handleSendForm} value={formData?.text} className="input-green"
                          name="text"
                          rows={5}
                          maxLength={2048}
                />
                <button className="button-green" type="submit">Отправить</button>
            </form>
            {errors && <div className="error">{errors}</div>}
            {messages.slice().reverse().map((message, index) => (
                <ChatMessage key={index} message={message}/>
            ))}
        </div>
    );
};