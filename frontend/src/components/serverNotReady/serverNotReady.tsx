"use client";

import React, {useEffect, useState} from "react";
import "./serverNotReady.css";
import {getBackendURL} from "@/libs/server";
import Loader from "@/components/loader/loader";
import axios, {CancelTokenSource} from "axios";

export default function ServerNotReady() {
    const [isServerAvailable, setIsServerAvailable] = useState<boolean>(false);
    let cancelToken: CancelTokenSource | null = null; // Локальная переменная для токена отмены
    let timeoutId: NodeJS.Timeout | null = null;

    const check = async () => {
        if (cancelToken) {
            cancelToken.cancel();
        }
        cancelToken = axios.CancelToken.source();
        try {
            const response = await axios.get(await getBackendURL() + "/health", {
                cancelToken: cancelToken.token,
            });
            if (response.status === 200) {
                setIsServerAvailable(true);
            } else {
                setIsServerAvailable(false);
                timeoutId = setTimeout(check, 5000);
            }
        } catch (error) {
            console.error(error)
            setIsServerAvailable(false);
            timeoutId = setTimeout(check, 5000);
        }
    };
    useEffect(() => {
        check();
        return () => {
            if (cancelToken) {
                cancelToken.cancel();
            }
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    });

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