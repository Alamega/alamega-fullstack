declare interface IUser {
    token: string
    id: string;
    username: string;
    role: IRole;
}

declare interface IRole {
    id: string;
    value: string;
    name: string;
    authorities: string[];
}

declare interface IPost {
    id?: string;
    text: string;
    date?: Date;
}

declare interface ISession {
    user: IUser;
}

declare interface IMessage {
    author: IUser,
    text: string
}

declare interface IErrorResponse {
    status: number;
    message?: string;
    fieldErrors?: Record<string, string[]>;
}

declare interface IPageable<T> {
    content: T[];
    page: {
        size: number;
        number: number;
        totalElements: number;
        totalPages: number;
    };
}