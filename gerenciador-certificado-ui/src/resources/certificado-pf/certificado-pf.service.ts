import { CertificadoPF, CertificadoPFResponse } from './certificado-pf.resources';
import { useAuth } from '@/resources'

class CertificadoPFService {
    baseUrl: string = process.env.NEXT_PUBLIC_API_URL + '/api/certificado-pf';
    auth = useAuth();

    async getAll(page: number, limit: number) : Promise<CertificadoPFResponse> {
        const useSession = this.auth.getUserSession();
        const response = await fetch(`${this.baseUrl}?page=${page}&limit=${limit}`, {
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

        if(response.status !== 201) {
            const responseError = await response.json();
            console.log(responseError);
            throw new Error(responseError.error);
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
