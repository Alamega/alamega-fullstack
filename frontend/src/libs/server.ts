"use server";

import axios, {AxiosRequestConfig} from "axios";
import {getSession} from "@/libs/auth";

const backendURL = process.env.INTERNAL_BACKEND_URL || "http://localhost:8080";

export async function checkBackendHealth() {
    try {
        const response = await axios.get(backendURL.concat("/health"));
        return response.status === 200;
    } catch (error) {
        console.error("Ошибка проверки состояния сервера:", error);
        return false;
    }
}


export async function fetchDataFromBackend<D>(endpoint: string, config?: AxiosRequestConfig<D>) {
    const session = await getSession();
    return await axios.get(backendURL.concat(endpoint), {
        ...config,
        headers: {
            ...(session?.user.token ? {Authorization: `Bearer ${session.user.token}`} : {}),
            ...config?.headers,
        }
    });
}

export async function postDataToBackend<D>(endpoint: string, data?: D, config?: AxiosRequestConfig<D>) {
    const session = await getSession();
    return axios.post(backendURL.concat(endpoint), data, {
        ...config,
        headers: {
            Authorization: `Bearer ${session?.user.token}`,
            ...config?.headers
        }
    });
}

export async function deleteDataFromBackend<D>(endpoint: string, config?: AxiosRequestConfig<D>) {
    const session = await getSession();
    return axios.delete(backendURL.concat(endpoint), {
        ...config,
        headers: {
            Authorization: `Bearer ${session?.user.token}`,
            ...config?.headers
        }
    });
}