declare interface User {
    token: string
    id: string;
    username: string;
    role: string;
}

declare interface Session {
    user: User;
}