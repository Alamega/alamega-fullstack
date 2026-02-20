"use client";

import React, {useEffect, useMemo, useRef, useState} from "react";
import ChatMessage from "@/components/chat/message/message";
import Loader from "@/components/loader/loader";
import ButtonWithLoader from "@/components/buttonWithLoader/buttonWithLoader";
import "./chat.css";

export default function Chat({session}: { session: ISession | null }) {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [errors, setErrors] = useState("");
    const [isConnected, setIsConnected] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

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
                setMessages((prev) => [...prev, newMessage].slice(-100));
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

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
    };

    useEffect(() => {
        if (isConnected) {
            scrollToBottom();
        }
    }, [messages, isConnected]);

    const handleSend = async (formData: FormData) => {
        const text = formData.get("text")?.toString().trim();
        if (text && socket?.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({text}));
            formRef.current?.reset();
            setErrors("");
        } else if (!text) {
            setErrors("Сообщение пустое!");
        } else {
            setErrors("Нет соединения с сервером");
        }
    };
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            formRef.current?.requestSubmit();
        }
    };

    return (
        <div className={"chat-wrapper"}>
            <div className="chat-messages-wrapper">
                {isConnected && messages.map((message, index) => (
                    <ChatMessage key={index} message={message}/>
                ))}
                <div ref={messagesEndRef}/>
                {!isConnected && <Loader message="Подключаемся..."/>}
            </div>
            <form ref={formRef} action={handleSend} className="chat-message-post-form">
                <textarea
                    className="input-green"
                    name="text"
                    rows={5}
                    maxLength={2048}
                    disabled={!isConnected}
                    onKeyDown={handleKeyDown}
                />
                <ButtonWithLoader loading={!isConnected}>
                    Отправить
                </ButtonWithLoader>
            </form>

            {errors && <div className="error" style={{color: 'red'}}>{errors}</div>}
        </div>
    );
}