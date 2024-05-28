export class User {
    nome?: string;
    email?: string;
    senha?: string;
}

export class Credentials {
    email?: string;
    senha?: string;
}

export class AccessToken {
    accessToken?: string;
}

export class UserSessionToken {
    nome?: string;
    email?: string;
    accessToken?: string;
    expiration?: number;
}