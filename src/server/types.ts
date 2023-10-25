export interface BaseUser {
    email: string;
    password: string;
}

export interface User extends BaseUser {
    id: number;
}

export interface Account {
    name: string;
    url: string;
    username: string;
    password: string;
}

export interface Payload {
    email: string;
}

declare global {
    namespace Express {
        export interface Request {
            user: Payload;
        }
    }
}
