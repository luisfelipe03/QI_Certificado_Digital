import { CertificadoPF, CertificadoPFResponse } from './certificado-pf.resources';
import { useAuth } from '@/resources'

class CertificadoPFService {
    baseUrl: string = 'http://localhost:8080/api/certificado-pf';
    auth = useAuth();

    async getAll(page: number = 0, limit: number = 10) : Promise<CertificadoPFResponse> {
        const useSession = this.auth.getUserSession();
        const response = await fetch(`${this.baseUrl}/validos?page=${page}&limit=${limit}`, {
            headers: {
                "Authorization": `Bearer ${useSession?.accessToken}`
            }
        });
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
        const useSession = this.auth.getUserSession();
        const response = await fetch(`${this.baseUrl}/find-nome?nome=${name}`, {
            headers: {
                "Authorization": `Bearer ${useSession?.accessToken}`
            }
        });
        return await response.json();
    }

    async getByCpf(cpf: string) : Promise<CertificadoPF> {
        const useSession = this.auth.getUserSession();
        const response = await fetch(`${this.baseUrl}/find-cpf?cpf=${cpf}`, {
            headers: {
                "Authorization": `Bearer ${useSession?.accessToken}`
            }
        });
        return await response.json();
    }

    async create(data: FormData): Promise<CertificadoPF> {
        const useSession = this.auth.getUserSession();
        const response = await fetch(`${this.baseUrl}/upload`, {
            method: 'POST',
            body: data,
            headers: {
                "Authorization": `Bearer ${useSession?.accessToken}`
            }
        });

        if (!response.ok) {
            // Se a resposta não for bem-sucedida, lança um erro com a mensagem do corpo da resposta
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }

        return await response.json();
    
}


    async delete(uuid: string): Promise<void> {
        const useSession = this.auth.getUserSession();
        await fetch(`${this.baseUrl}/${uuid}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${useSession?.accessToken}`
            }
        });
    }
}

export const useCertificadoPFService = () => new CertificadoPFService();
