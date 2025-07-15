"use client";

import React, {useEffect, useState} from "react";
import "./serverNotReady.css";
import Loader from "@/components/loader/loader";
import {checkBackendHealth} from "@/libs/server";

export default function ServerNotReady() {
    const [isServerAvailable, setIsServerAvailable] = useState(false);

    useEffect(() => {
        const check = async () => {
            const available = await checkBackendHealth();
            setIsServerAvailable(available);
        };
        check().then();
        const interval = setInterval(check, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        !isServerAvailable && (
            <div className="server-not-ready">
                <Loader message="Проверка доступности сервера"/>
            </div>
        )
    );
}
