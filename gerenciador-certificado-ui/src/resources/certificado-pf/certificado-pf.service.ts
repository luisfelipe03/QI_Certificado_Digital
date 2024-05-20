import { CertificadoPF } from './certificado-pf.resources';

class CertificadoPFService {
    baseUrl: string = 'http://localhost:8080/api/certificado-pf';

    async getAll() : Promise<CertificadoPF[]> {
        const response = await fetch(this.baseUrl + '/validos');
        return await response.json();
    }

    async getByName(name: string = "") : Promise<CertificadoPF[]> {
        const response = await fetch(`${this.baseUrl}/find-nome?nome=${name}`);
        return await response.json();
    }
}

export const useCertificadoPFService = () => new CertificadoPFService();