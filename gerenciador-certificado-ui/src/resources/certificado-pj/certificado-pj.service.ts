import { CertificadoPJ } from './certificado-pj.resources';

class CertificadoPJService {
    baseUrl: string = 'http://localhost:8080/api/certificado-pj';

    async getAllByTipo(tipo: string): Promise<CertificadoPJ[]> {
        try {
            const response = await fetch(`${this.baseUrl}/${tipo}/validos`);
            if (!response.ok) {
                throw new Error('Erro ao buscar os certificados');
            }
            return await response.json();
        } catch (error) {
            console.error('Erro ao buscar os certificados:', error);
            return [];
        }
    }

    async getByRazaoAndTipo(query: string, tipo: string): Promise<CertificadoPJ[]> {
        const response = await fetch(`${this.baseUrl}/find-razao-social?razaoSocial=${query}&tipoCertificado=${tipo}`);
        return await response.json();
    }

    async create(data: FormData): Promise<CertificadoPJ> {
        try {
            const response = await fetch(this.baseUrl, { method: 'POST', body: data });
            if (!response.ok) {
                throw new Error('Erro ao criar o certificado');
            }
            return await response.json();
        } catch (error) {
            console.error('Erro ao criar o certificado:', error);
            return {} as CertificadoPJ;
        }
    }

    async delete(uuid: string): Promise<void> {
        try {
            const response = await fetch(`${this.baseUrl}/${uuid}`, { method: 'DELETE' });
            if (!response.ok) {
                throw new Error('Erro ao excluir o certificado');
            }
        } catch (error) {
            console.error('Erro ao excluir o certificado:', error);
        }
    }
}

export const useCertificadoPJService = () => new CertificadoPJService();
