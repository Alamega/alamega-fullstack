declare interface IUser {
    token: string
    id: string;
    username: string;
    role: string;
}

declare interface IPost {
    id?: string;
    text?: string;
    date?: string;
}

declare interface ISession {
    user: IUser;
}