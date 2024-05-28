import { CertificadoPF, CertificadoPFResponse } from './certificado-pf.resources';

class CertificadoPFService {
    baseUrl: string = 'http://localhost:8080/api/certificado-pf';

    async getAll(page: number = 0, limit: number = 10) : Promise<CertificadoPFResponse> {
        const response = await fetch(`${this.baseUrl}/validos?page=${page}&limit=${limit}`);
        const data = await response.json();
        return {
            data: data.data.map((item: any) => ({
                uuid: item.uuid,
                nome: item.nome,
                cpf: item.cpf,
                dataEmissao: item.dataEmissao,
                dataVencimento: item.dataVencimento,
                tipoCertificado: item.tipoCertificado,
                valido: item.valido
            })),
            total: data.total
        };
    }

    async getByName(name: string = "") : Promise<CertificadoPF[]> {
        const response = await fetch(`${this.baseUrl}/find-nome?nome=${name}`);
        return await response.json();
    }

    async getByCpf(cpf: string) : Promise<CertificadoPF> {
        const response = await fetch(`${this.baseUrl}/find-cpf?cpf=${cpf}`);
        return await response.json();
    }

    async create(data: FormData): Promise<CertificadoPF> {
        const response = await fetch(`${this.baseUrl}/upload`, {
            method: 'POST',
            body: data
        });

        if (!response.ok) {
            // Se a resposta não for bem-sucedida, lança um erro com a mensagem do corpo da resposta
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }

        return await response.json();
    
}


    async delete(uuid: string): Promise<void> {
        await fetch(`${this.baseUrl}/${uuid}`, {
            method: 'DELETE'
        });
    }
}

export const useCertificadoPFService = () => new CertificadoPFService();
