'use client'

interface CertificateTablePJProps {
    uuid?: string;
    razaoSocial?: string;
    cnpj?: string;
    dataEmissao?: string;
    dataVencimento?: string;
}

export const CertificateTablePJ: React.FC<CertificateTablePJProps> = (props: CertificateTablePJProps) => {
    return (
        <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Razão Social
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      CNPJ
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Data de Emissão
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Data de Vencimento
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    <tr key={props.uuid}>
                      <td className="px-6 py-4 whitespace-nowrap">{props.razaoSocial}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{props.cnpj}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{props.dataEmissao}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{props.dataVencimento}</td>
                    </tr>
                </tbody>
              </table>
            </div>
    );
}