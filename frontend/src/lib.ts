'use server'

import {jwtVerify, SignJWT} from "jose";
import {cookies} from "next/headers";
import axios from "axios";
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

export async function login(formData: FormData) {
    const response = await axios.post('http://localhost:8080/authenticate', {
        username: formData.get('username'),
        password: formData.get('password'),
    });
    const user = response.data;
    const expires = new Date(Date.now() + expirationTime);
    const session = await encrypt({user, expires});
    cookies().set("session", session, {expires, httpOnly: true});
    //TODO Добавить обработку ошибок
    redirect("/");
}

export async function logout() {
    cookies().set("session", "", {expires: new Date(0)});
}

export async function getSession() {
    const session = cookies().get("session")?.value;
    if (!session) return null;
    return await decrypt(session);
}

// export async function updateSession(request: NextRequest) {
//     const session = request.cookies.get("session")?.value;
//     if (!session) return;
//     const parsed = await decrypt(session);
//     parsed.expires = new Date(Date.now() + expirationTime);
//     const res = NextResponse.next();
//     res.cookies.set({
//         name: "session",
//         value: await encrypt(parsed),
//         httpOnly: true,
//         expires: parsed.expires,
//     });
//     return res;
// }