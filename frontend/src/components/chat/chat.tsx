"use client";

import React, {useEffect, useMemo, useRef, useState} from "react";
import ChatMessage from "@/components/chat/message/message";
import Loader from "@/components/loader/loader";
import ButtonWithLoader from "@/components/buttonWithLoader/buttonWithLoader";
import "./chat.css";
import {useSession} from "@/app/providers/SessionProvider";
import {Client} from "@stomp/stompjs";

export default function Chat() {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [stompClient, setStompClient] = useState<Client | null>(null);
    const [errors, setErrors] = useState("");
    const [isConnected, setIsConnected] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const session = useSession();

    const wsURL = useMemo(() => {
        const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
        if (!backendURL) return null;
        return backendURL.replace("http", "ws") + "/chat-message";
    }, []);

    useEffect(() => {
        const loadHistory = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat/history`);
                if (response.ok) {
                    const historyMessages = await response.json();
                    setMessages(historyMessages.slice(-100));
                }
            } catch (error) {
                console.error("Ошибка загрузки истории чата:", error);
            }
        };

        loadHistory();

        if (!wsURL) return;

        const client = new Client({
            brokerURL: wsURL,
            connectHeaders: {
                Authorization: session?.user?.token ? `Bearer ${session.user.token}` : "",
            },
            onConnect: () => {
                setIsConnected(true);

                client.subscribe("/topic/messages", (message) => {
                    const newMessage = JSON.parse(message.body);
                    setMessages((prev) => {
                        if (prev.some(m => m.id === newMessage.id)) return prev;
                        return [...prev, newMessage].slice(-100);
                    });
                });
            },
            onDisconnect: () => setIsConnected(false),
            onWebSocketClose: () => setIsConnected(false),
        });

        client.activate();
        setStompClient(client);

        return () => {
            client.deactivate();
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

        if (text && stompClient && stompClient.connected) {
            stompClient.publish({
                destination: "/app/send",
                body: JSON.stringify({text: text}),
            });

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
