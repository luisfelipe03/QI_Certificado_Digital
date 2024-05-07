import { CertificadoPJ } from './certificado-pj.resources';

class CertificadoPJService {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async getAllByTipo(tipo: string): Promise<CertificadoPJ[]> {
        try {
            const response = await fetch(`${this.baseUrl}/${tipo}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar os certificados');
            }
            return await response.json();
        } catch (error) {
            console.error('Erro ao buscar os certificados:', error);
            return [];
        }
    }
}

const BASE_URL = 'http://localhost:8080/api/certificado-pj';
export const useCertificadoPJService = () => new CertificadoPJService(BASE_URL);
