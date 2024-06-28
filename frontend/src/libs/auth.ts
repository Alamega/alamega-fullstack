'use server'

import {JWTPayload, jwtVerify, SignJWT} from "jose";
import {cookies} from "next/headers";
import axios, {AxiosError} from "axios";
import {redirect} from "next/navigation";

const key = new TextEncoder().encode("secret");
const expirationTime = 24 * 60 * 60 * 1000;

export async function encrypt(payload: JWTPayload) {
    return await new SignJWT(payload)
        .setProtectedHeader({alg: "HS256"})
        .setIssuedAt()
        .setExpirationTime(Date.now() + expirationTime)
        .sign(key);
}

export async function decrypt(sessionToken: string): Promise<any> {
    const {payload} = await jwtVerify(sessionToken, key, {
        algorithms: ["HS256"],
    });
    return payload;
}

async function handleAuth(response: any) {
    if (!response) {
        return "Сервер авторизации недоступен."
    }

    switch (response.status) {
        case 200: {
            const user: IUser = response.data;
            const expires = new Date(Date.now() + expirationTime);
            const sessionToken = await encrypt({user, expires});
            cookies().set("session", sessionToken, {expires, httpOnly: true});
            return redirect("/");
        }
        default:
            return response.data.message;
    }
}


export async function login(formData: FormData): Promise<string> {
    return await axios.post(process.env.NEXT_PUBLIC_API_URL + '/auth/authenticate', {
        username: formData.get('username'),
        password: formData.get('password'),
    }).catch((error: AxiosError) => {
        return error.response
    }).then(handleAuth)
}

export async function registration(formData: FormData): Promise<string> {
    return await axios.post(process.env.NEXT_PUBLIC_API_URL + '/auth/register', {
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

export async function getSession(): Promise<ISession | null> {
    const sessionToken = cookies().get("session")?.value;
    if (!sessionToken) return null
    return await decrypt(sessionToken);
}