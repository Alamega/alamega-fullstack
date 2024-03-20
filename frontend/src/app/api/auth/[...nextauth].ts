import axios from "axios";
import type {NextAuthOptions} from "next-auth"
import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: {label: "Username", type: "text", placeholder: "Login"},
                password: {label: "Password", type: "password"},
            },
            async authorize(credentials, req) {
                const response = await axios.post("http://localhost:8080/authenticate", {
                    username: credentials?.username,
                    password: credentials?.password,
                })
                return response.data;
            },
        }),
    ],
    // jwt: {
    //     async encode({secret, token}) {
    //         return jwt.sign(token, secret)
    //     },
    //     async decode({secret, token}) {
    //         return jwt.verify(token, secret)
    //     },
    // },
}

export default NextAuth(authOptions)