import { CertificadoPJ, CertificadoPJResponse } from './certificado-pj.resources';

class CertificadoPJService {
    baseUrl: string = 'http://localhost:8080/api/certificado-pj';

    async getAllByTipo(tipo: String, page: number, limit: number): Promise<CertificadoPJResponse> {
        const response = await fetch(`${this.baseUrl}/${tipo}/validos?page=${page}&limit=${limit}`);
        const data = await response.json();
        return {
            data: data.data.map((item: any) => ({
                uuid: item.uuid,
                razaoSocial: item.razaoSocial,
                cnpj: item.cnpj,
                dataEmissao: item.dataEmissao,
                dataVencimento: item.dataVencimento,
                tipoCertificado: item.tipoCertificado,
                valido: item.valido
            })),
            total: data.total
        };
    }

    async getByRazaoAndTipo(query: string, tipo: string): Promise<CertificadoPJ[]> {
        const response = await fetch(`${this.baseUrl}/find-razao-social?razaoSocial=${query}&tipoCertificado=${tipo}`);
        return await response.json();
    }

    async getByCnpjAndTipo(cnpj: string, tipo: string): Promise<CertificadoPJ> {
        const response = await fetch(`${this.baseUrl}/find-cnpj?cnpj=${cnpj}&tipoCertificado=${tipo}`);
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
