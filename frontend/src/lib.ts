'use server'

import {jwtVerify, SignJWT} from "jose";
import {cookies} from "next/headers";
import axios, {AxiosError} from "axios";
import {redirect} from "next/navigation";

const key = new TextEncoder().encode("secret");
const expirationTime = 24 * 60 * 60 * 1000;

export async function encrypt(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({alg: "HS256"})
        .setIssuedAt()
        .setExpirationTime(Date.now() + expirationTime)
        .sign(key);
}

export async function decrypt(input: string): Promise<any> {
    const {payload} = await jwtVerify(input, key, {
        algorithms: ["HS256"],
    });
    return payload;
}

async function handleAuth(response: any) {
    if (!response) {
        return "Неизвестная ошибка."
    }

    switch (response.status) {
        case 200: {
            const user: User = response.data;
            const expires = new Date(Date.now() + expirationTime);
            const session = await encrypt({user, expires});
            cookies().set("session", session, {expires, httpOnly: true});
            return redirect("/");
        }
        default:
            return response.data.message;
    }
}


export async function login(formData: FormData): Promise<string> {
    return await axios.post(process.env.NEXT_PUBLIC_API_URL + '/api/auth/authenticate', {
        username: formData.get('username'),
        password: formData.get('password'),
    }).catch((error: AxiosError) => {
        return error.response
    }).then(handleAuth)
}

export async function registration(formData: FormData): Promise<string> {
    return await axios.post(process.env.NEXT_PUBLIC_API_URL + '/api/auth/register', {
        username: formData.get('username'),
        password: formData.get('password'),
        //Тут еще емэил будет имена фамилии явки и весь остальной ненужный кринж так что неважно что дубликат с логином
    }).catch((error: AxiosError) => {
        return error.response
    }).then(handleAuth)
}

export async function logout() {
    cookies().set("session", "", {expires: new Date(0)});
}

export async function getSession(): Promise<Session | null> {
    const session = cookies().get("session")?.value;
    if (!session) return null;
    return await decrypt(session);
}