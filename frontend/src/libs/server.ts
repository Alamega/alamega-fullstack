"use server";

import axios, {AxiosRequestConfig} from "axios";
import {getSession} from "@/libs/auth";

export async function getServerUrl() {
    const serverUrl = process.env.NEXT_PUBLIC_API_URL;
    if (serverUrl) {
        return serverUrl;
    } else {
        throw new Error("Переменная NEXT_PUBLIC_API_URL не установлена.");
    }
}

export async function fetchDataFromBackend<D>(url: string, config?: AxiosRequestConfig<D>) {
    const session = await getSession();
    return await axios.get(await getServerUrl() + url, {
        ...config,
        headers: {
            ...(session?.user.token ? {Authorization: `Bearer ${session.user.token}`} : {}),
            ...config?.headers,
        }
    });
}

export async function postDataToBackend<D>(url: string, data?: D, config?: AxiosRequestConfig<D>) {
    const session = await getSession();
    return axios.post(await getServerUrl() + url, data, {
        ...config,
        headers: {
            Authorization: `Bearer ${session?.user.token}`,
            ...config?.headers
        }
    });
}

export async function deleteDataFromBackend<D>(url: string, data?: D, config?: AxiosRequestConfig<D>) {
    const session = await getSession();
    return axios.delete(await getServerUrl() + url, {
        ...config,
        headers: {
            Authorization: `Bearer ${session?.user.token}`,
            ...config?.headers
        }
    });
}