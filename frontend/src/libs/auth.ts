"use server";

import {JWTPayload, jwtVerify, SignJWT} from "jose";
import {cookies} from "next/headers";
import {postDataToBackend} from "@/libs/server";
import {AxiosError} from "axios";

const key = new TextEncoder().encode("secret");
const expirationTime = 24 * 60 * 60 * 1000;

export async function encrypt(payload: JWTPayload) {
    return await new SignJWT(payload)
        .setProtectedHeader({alg: "HS256"})
        .setIssuedAt()
        .setExpirationTime(Date.now() + expirationTime)
        .sign(key);
}

export async function decrypt(sessionToken: string): Promise<JWTPayload> {
    const {payload} = await jwtVerify(sessionToken, key, {
        algorithms: ["HS256"],
    });
    return payload;
}

export async function getSession(): Promise<ISession | null> {
    const sessionToken = (await cookies()).get("session")?.value;
    if (!sessionToken) return null;
    return {
        user: (await decrypt(sessionToken)).user as IUser,
    } as ISession;
}

export async function registration(formData: FormData): Promise<IErrorResponse | null> {
    try {
        const response = await postDataToBackend("/auth/register", {
            username: formData.get("username"),
            password: formData.get("password"),
        });
        const {data: user} = response;
        const expires = new Date(Date.now() + expirationTime);
        const sessionToken = await encrypt({user, expires});
        (await cookies()).set("session", sessionToken, {expires, httpOnly: true});
        return null;
    } catch (error) {
        return (error as AxiosError).response?.data as IErrorResponse;
    }
}

export async function login(formData: FormData): Promise<IErrorResponse | null> {
    try {
        const response = await postDataToBackend("/auth/authenticate", {
            username: formData.get("username"),
            password: formData.get("password"),
        });
        const {data: user} = response;
        const expires = new Date(Date.now() + expirationTime);
        const sessionToken = await encrypt({user, expires});
        (await cookies()).set("session", sessionToken, {expires, httpOnly: true});
        return null;
    } catch (error) {
        return (error as AxiosError).response?.data as IErrorResponse;
    }
}

export async function logout() {
    (await cookies()).set("session", "", {expires: new Date(0)});
}