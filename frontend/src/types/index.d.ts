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

declare interface IPageablePostResponse {
    content: IPost[];
    page: {
        size: number;
        number: number;
        totalElements: number;
        totalPages: number;
    };
}

declare interface ISession {
    user: IUser;
}

interface IErrorResponse {
    message?: string;
    fieldErrors?: Record<string, string[]>;
}