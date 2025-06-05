"use client";

import React, {useCallback, useEffect, useRef, useState} from "react";
import "./serverNotReady.css";
import Loader from "@/components/loader/loader";
import {checkBackendHealth} from "@/libs/server";

export default function ServerNotReady() {
    const [isServerAvailable, setIsServerAvailable] = useState<boolean>(false);
    const timeoutId = useRef<NodeJS.Timeout | null>(null);

    const check = useCallback(async () => {
        const available = await checkBackendHealth();
        setIsServerAvailable(available);
        if (!available) {
            timeoutId.current = setTimeout(check, 5000);
        }
    }, []);

    useEffect(() => {
        check().then();
        return () => {
            if (timeoutId.current) {
                clearTimeout(timeoutId.current);
            }
        };
    }, [check]);

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
