import { CertificadoPJ } from './certificado-pj.resources';

class CertificadoPJService {
    baseUrl: string = 'http://localhost:8080/api/certificado-pj';

    async getAll() : Promise<CertificadoPJ[]> {
        const response = await fetch(this.baseUrl);
        return await response.json();
    }
}

export const useCertificadoPJService = () => new CertificadoPJService();