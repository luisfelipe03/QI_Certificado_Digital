export class CertificadoPJ {
    uuid?: string;
    razaoSocial?: string;
    cnpj?: string;
    dataEmissao?: string;
    dataVencimento?: string;
    tipoCertificado?: string;
    valido?: boolean; // Adicionando a nova propriedade 'valido' conforme os dados da API
}

export class CertificadoPJResponse {
    data: CertificadoPJ[] = [];
    total: number = 0;
}

// Função para converter a resposta da API em um objeto CertificadoPJResponse
export function parseCertificadoPJResponse(response: any): CertificadoPJResponse {
    return {
        data: response.data.map((item: any) => ({
            uuid: item.uuid,
            razaoSocial: item.razaoSocial,
            cnpj: item.cnpj,
            dataEmissao: item.dataEmissao,
            dataVencimento: item.dataVencimento,
            tipoCertificado: item.tipoCertificado,
            valido: item.valido
        })),
        total: response.total
    };
}
