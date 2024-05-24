export class CertificadoPF {
    uuid?: string;
    nome?: string;
    cpf?: string;
    dataEmissao?: string;
    dataVencimento?: string;
    tipoCertificado?: string;  // Corrigido typo de 'tipoCerificado' para 'tipoCertificado'
    valido?: boolean;  // Adicionando a nova propriedade 'valido' conforme os dados da API
}

export class CertificadoPFResponse {
    data: CertificadoPF[] = [];
    total: number = 0;
}

// Exemplo de função que lida com a resposta da API
export function parseCertificadoPFResponse(response: any): CertificadoPFResponse {
    return {
        data: response.data.map((item: any) => ({
            uuid: item.uuid,
            nome: item.nome,
            cpf: item.cpf,
            dataEmissao: item.dataEmissao,
            dataVencimento: item.dataVencimento,
            tipoCertificado: item.tipoCertificado,
            valido: item.valido
        })),
        total: response.total
    };
}
