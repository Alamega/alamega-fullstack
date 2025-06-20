"use client";

import React, {ChangeEvent, FormEvent, useState} from "react";
import ChatMessage from "@/components/chat/message/message";
import Loader from "@/components/loader/loader";
import ButtonWithLoader from "@/components/buttonWithLoader/buttonWithLoader";

export default function Chat({session}: { session: ISession | null }) {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [formData, setFormData] = useState({text: ""});
    const [errors, setErrors] = useState("");
    const [isConnected, setIsConnected] = useState(false);

    const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!backendURL) {
        throw new Error("NEXT_PUBLIC_BACKEND_URL is not defined.");
    }
    const wsURL = backendURL.replace("http", "ws") + "/chat";

    if (!socket) {
        setSocket(new WebSocket(wsURL));
    } else {
        socket.onopen = () => {
            setIsConnected(true);
        };
        socket.onmessage = (event) => {
            setMessages((prevState) => {
                return [...prevState, JSON.parse(event.data)].slice(-25);
            });
        };
        socket.onclose = () => {
            setIsConnected(false);
            setErrors("")
            setSocket(new WebSocket(wsURL));
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
                          disabled={!isConnected}
                />
                <ButtonWithLoader loading={!isConnected}>Отправить</ButtonWithLoader>
            </form>
            {errors && <div className="error">{errors}</div>}

            {isConnected && messages.slice().reverse().map((message, index) => (
                <ChatMessage key={index} message={message}/>
            ))}
            {!isConnected &&
                <div style={{height: "50px"}}>
                    <Loader message={"Пытаемся подключиться к чатику"}/>
                </div>
            }
        </div>
    );
};