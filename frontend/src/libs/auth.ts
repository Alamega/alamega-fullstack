'use server'

import {JWTPayload, jwtVerify, SignJWT} from "jose";
import {cookies} from "next/headers";
import axios, {AxiosError} from "axios";

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

export async function getSession(): Promise<ISession | null> {
    const sessionToken = (await cookies()).get("session")?.value;
    if (!sessionToken) return null
    return await decrypt(sessionToken);
}

export async function registration(formData: FormData): Promise<IErrorResponse | null> {
    try {
        const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/auth/register', {
            username: formData.get('username'),
            password: formData.get('password'),
        });
        const user: IUser = response.data;
        const expires = new Date(Date.now() + expirationTime);
        const sessionToken = await encrypt({user, expires});
        const cook = await cookies();
        cook.set("session", sessionToken, {expires, httpOnly: true});
        return null;
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            return error.response.data;
        } else {
            return null;
        }
    }
}


export async function login(formData: FormData): Promise<IErrorResponse | null> {
    try {
        const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/auth/authenticate', {
            username: formData.get('username'),
            password: formData.get('password'),
        });
        const user: IUser = response.data;
        const expires = new Date(Date.now() + expirationTime);
        const sessionToken = await encrypt({user, expires});
        const cook = await cookies();
        cook.set("session", sessionToken, {expires, httpOnly: true});
        return null;
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            return error.response.data;
        } else {
            return null;
        }
    }
}

export async function logout() {
    (await cookies()).set("session", "", {expires: new Date(0)});
}