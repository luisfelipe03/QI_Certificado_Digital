import { AccessToken, Credentials, User, UserSessionToken } from './users.resource'
import jwt from 'jwt-decode';

class AuthService {
    baseURL = 'http://localhost:8080/api/users';
    static AUTH_PARAM: string = '_auth';

    async authenticate(credentials: Credentials): Promise<AccessToken> {
        const response = await fetch(`${this.baseURL}/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        if(response.status == 401) {
            throw new Error('Credenciais inválidas');
        }

        return await response.json();
    }

    async save(user: User): Promise<void> {
        const response = await fetch(this.baseURL, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if(response.status == 409) {
            const responseError = await response.json();
            throw new Error(responseError.error);
        }
    }

    initSession(token: AccessToken) {
        if(token.accessToken) {
            const decodedToken: any = jwt(token.accessToken);

            const userSessionToken: UserSessionToken = {
                accessToken: token.accessToken,
                email: decodedToken.sub,
                nome: decodedToken.nome,
                expiration: decodedToken.exp,    
            }
            this.setUserSession(userSessionToken);
        }
    }

    setUserSession(userSession: UserSessionToken) {
        try {
            localStorage.setItem(AuthService.AUTH_PARAM, JSON.stringify(userSession));
        } catch (error) {
            console.error('Erro ao salvar sessão', error);
        }
    }

    getUserSession() : UserSessionToken | null {
        try {
            const userSession = localStorage.getItem(AuthService.AUTH_PARAM);
            if(!userSession) {
                return null;
            }
            
            const token: UserSessionToken = JSON.parse(userSession);
            return token;
        } catch (error) {
            console.error('Erro ao recuperar sessão', error);
            return null;
        }
    }

    isSessionValid(): boolean {
        const userSession: UserSessionToken | null = this.getUserSession();
        if (!userSession) {
            return false;
        }

        const expiration: number | undefined = userSession.expiration;
        if (expiration) {
            const expirationDateInMillis = expiration * 1000;
            return new Date() < new Date(expirationDateInMillis);
        }
        return false;
    }

    invalidateSession(): void {
        try{
            localStorage.removeItem(AuthService.AUTH_PARAM);
        }catch(error){
            console.error('Erro ao remover sessão', error);
        }
    }

}

export const useAuth = () => new AuthService();