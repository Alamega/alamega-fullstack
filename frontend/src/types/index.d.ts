declare interface User {
    id: string;
    username: string;
    role: string;
}

declare interface Session {
    user: User;
}