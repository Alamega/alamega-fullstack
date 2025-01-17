'use server'

import axios from "axios";
import {getSession} from "@/libs/auth";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getServerUrl() {
    return BACKEND_URL;
}

export async function fetchDataFromBackend<D = any>(url: string, config?: axios.AxiosRequestConfig<D>) {
    const session = await getSession();
    return await axios.get(BACKEND_URL + url, {
        ...config,
        headers: {
            Authorization: `Bearer ${session?.user.token}`,
            ...config?.headers,
        }
    });
}

export async function postDataToBackend<D = any>(url: string, data?: D, config?: axios.AxiosRequestConfig<D>) {
    const session = await getSession();
    return axios.post(BACKEND_URL + url, data, {
        ...config,
        headers: {
            Authorization: `Bearer ${session?.user.token}`,
            ...config?.headers
        }
    });
}

export async function deleteDataFromBackend<D = any>(url: string, data?: D, config?: axios.AxiosRequestConfig<D>) {
    const session = await getSession();
    return axios.delete(BACKEND_URL + url, {
        ...config,
        headers: {
            Authorization: `Bearer ${session?.user.token}`,
            ...config?.headers
        }
    });
}