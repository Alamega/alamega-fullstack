"use client";

import React, {useEffect, useState} from "react";
import "./serverNotReady.css";
import Loader from "@/components/loader/loader";
import {checkBackendHealth} from "@/libs/server"; // Импортируйте вашу серверную функцию

export default function ServerNotReady() {
    const [isServerAvailable, setIsServerAvailable] = useState<boolean>(false);
    let timeoutId: NodeJS.Timeout | null = null;

    const check = async () => {
        const available = await checkBackendHealth(); // Вызов серверной функции
        setIsServerAvailable(available);
        if (!available) {
            timeoutId = setTimeout(check, 5000);
        }
    };

    useEffect(() => {
        check();
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, []);

    if (isServerAvailable) {
        return null;
    } else {
        return (
            <div className="server-not-ready">
                <Loader message={"Проверка доступности сервера"}/>
            </div>
        );
    }
}
