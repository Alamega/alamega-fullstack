"use client";

import React, {useEffect, useState} from "react";
import "./serverNotReady.css";
import {getServerUrl} from "@/libs/server";
import Loader from "@/components/loader/loader";

export default function ServerNotReady() {
    const [isServerAvailable, setIsServerAvailable] = useState(false);

    useEffect(() => {
        async function check() {
            return await fetch(await getServerUrl()).then((response) => {
                if (response.ok) {
                    setIsServerAvailable(true);
                } else {
                    setIsServerAvailable(false);
                }
            }).catch((error) => {
                setIsServerAvailable(false);
            });
        }

        const intervalId = setInterval(check, 5000);
        return () => {
            clearInterval(intervalId);
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