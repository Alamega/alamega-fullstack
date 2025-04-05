"use client";

import React, {useEffect, useState} from "react";
import "./serverNotReady.css";
import {getServerUrl} from "@/libs/server";
import Loader from "@/components/loader/loader";
import axios, {CancelTokenSource} from "axios";

export default function ServerNotReady() {
    const [isServerAvailable, setIsServerAvailable] = useState<boolean>(false);
    let cancelToken: CancelTokenSource;
    let timeoutId: NodeJS.Timeout | null = null;

    const check = async () => {
        if (cancelToken) {
            cancelToken.cancel();
        }
        cancelToken = axios.CancelToken.source();
        axios.get(await getServerUrl() + "/health", {cancelToken: cancelToken.token})
            .then(response => {
                if (response.status === 200) {
                    setIsServerAvailable(true);
                } else {
                    setIsServerAvailable(false);
                    timeoutId = setTimeout(check, 5000);
                }
            }).catch(error => {
            console.log(error);
            setIsServerAvailable(false);
            timeoutId = setTimeout(check, 5000);
        });
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
