"use server";

import axios, {AxiosRequestConfig} from "axios";
import {getSession} from "@/libs/auth";

const rawBackendURL = process.env.INTERNAL_BACKEND_URL;
if (!rawBackendURL) {
    throw new Error("Environment variable INTERNAL_BACKEND_URL is not defined.");
}
const api = axios.create({baseURL: rawBackendURL});

//Добавление хедера
api.interceptors.request.use(async config => {
    const session = await getSession();
    if (session?.user?.token) {
        config.headers.set("Authorization", `Bearer ${session.user.token}`);
    }
    return config;
});

export async function checkBackendHealth() {
    try {
        const response = await api.get("/health");
        return response.status === 200;
    } catch (error) {
        console.info("Бэкич недоступен:", error);
        return false;
    }
}

export const getDataFromBackend = async <T>(
    endpoint: string,
    config?: AxiosRequestConfig
): Promise<T> => {
    const r = await api.get<T>(endpoint, config);
    return r.data as T;
};

export const postDataToBackend = async <T, D>(
    endpoint: string,
    data?: D,
    config?: AxiosRequestConfig
): Promise<T> => {
    const r = await api.post<T>(endpoint, data, config);
    return r.data as T;
};

export const deleteDataFromBackend = async <T>(
    endpoint: string,
    config?: AxiosRequestConfig
): Promise<T> => {
    const r = await api.delete<T>(endpoint, config);
    return r.data as T;
};