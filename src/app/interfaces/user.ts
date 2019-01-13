export interface User {
    nick: string;
    age: number;
    email: string;
    uid: any;
    // non mandatory fields use a "?" at the end of their name
    logged?: boolean;
    subnick?: string;
}
