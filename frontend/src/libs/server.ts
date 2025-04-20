"use server";

import axios, {AxiosRequestConfig} from "axios";
import {getSession} from "@/libs/auth";

const backendURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export async function getBackendURL() {
    if (backendURL) {
        return backendURL;
    } else {
        throw new Error("Переменная NEXT_PUBLIC_API_URL не установлена.");
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