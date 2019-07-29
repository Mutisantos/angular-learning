export type status  = 'online' | 'away' | 'busy' | 'offline' | 0;

export interface User {
    nick: string;
    age?: number;
    email: string;
    uid: any;
    // non mandatory fields use a "?" at the end of their name
    logged?: boolean;
    subnick?: string;
    status?: status;
    // image url
    avatar?: string;
}
