"use client";

import React, {ChangeEvent, FormEvent, useEffect, useMemo, useState} from "react";
import ChatMessage from "@/components/chat/message/message";
import Loader from "@/components/loader/loader";
import ButtonWithLoader from "@/components/buttonWithLoader/buttonWithLoader";

export default function Chat({session}: { session: ISession | null }) {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [formData, setFormData] = useState({text: ""});
    const [errors, setErrors] = useState("");
    const [isConnected, setIsConnected] = useState(false);

    const wsURL = useMemo(() => {
        const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
        if (!backendURL) return null;
        return backendURL.replace("http", "ws") + "/chat";
    }, []);

    useEffect(() => {
        if (!wsURL) return;
        let isStopped = false;
        const protocols = session?.user?.token ? [session.user.token] : [];
        const ws = new WebSocket(wsURL, protocols);
        ws.onopen = () => {
            if (!isStopped) {
                setIsConnected(true);
                setSocket(ws);
            }
        };
        ws.onmessage = (event) => {
            if (!isStopped) {
                const newMessage = JSON.parse(event.data);
                setMessages((prev) => [...prev, newMessage].slice(-25));
            }
        };
        ws.onclose = () => {
            if (!isStopped) {
                setIsConnected(false);
                setSocket(null);
            }
        };
        return () => {
            isStopped = true;
            ws.close();
        };
    }, [wsURL, session?.user?.token]);

    const handleSend = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (formData.text.trim() && socket?.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({text: formData.text}));
            setFormData({text: ""});
            setErrors("");
        } else if (!formData.text.trim()) {
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