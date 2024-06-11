import { CertificadoPJ, CertificadoPJResponse } from './certificado-pj.resources';
import { useAuth } from '@/resources';

class CertificadoPJService {
    baseUrl: string = process.env.NEXT_PUBLIC_API_URL + '/api/certificado-pj';
    auth = useAuth();

    async getAllByTipo(tipo: String, page: number, limit: number): Promise<CertificadoPJResponse> {
        const useSession = this.auth.getUserSession();
        const response = await fetch(`${this.baseUrl}/${tipo}?page=${page}&limit=${limit}`, {
            headers: {
                "Authorization": `Bearer ${useSession?.accessToken}`
            }
        });
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
        const useSession = this.auth.getUserSession();
        const response = await fetch(`${this.baseUrl}/find-razao-social?razaoSocial=${query}&tipoCertificado=${tipo}`, {
            headers: {
                "Authorization": `Bearer ${useSession?.accessToken}`
            }
        });
        return await response.json();
    }

    async getByCnpjAndTipo(cnpj: string, tipo: string): Promise<CertificadoPJ> {
        const useSession = this.auth.getUserSession();
        const response = await fetch(`${this.baseUrl}/find-cnpj?cnpj=${cnpj}&tipoCertificado=${tipo}`, {
            headers: {
                "Authorization": `Bearer ${useSession?.accessToken}`
            }
        });
        return await response.json();
    }

    async create(data: FormData): Promise<CertificadoPJ> {
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
        try {
            const useSession = this.auth.getUserSession();
            const response = await fetch(`${this.baseUrl}/${uuid}`, { 
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${useSession?.accessToken}`
                }
            });
            if (!response.ok) {
                throw new Error('Erro ao excluir o certificado');
            }
        } catch (error) {
            console.error('Erro ao excluir o certificado:', error);
        }
    }
}

export const useCertificadoPJService = () => new CertificadoPJService();
