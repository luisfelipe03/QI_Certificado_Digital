'use client'

import React from 'react';
import { CertificadoPF } from '@/resources/certificado-pf/certificado-pf.resources';

interface CertificateTablePJProps {
    certificadoPF: CertificadoPF[];
}

export const CertificateTablePF: React.FC<CertificateTablePJProps> = ({certificadoPF}) => {
    return (
        <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nome
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      CPF
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
                    {certificadoPF.map((props) => (
                      <tr key={props.uuid}>
                        <td className="px-6 py-4 whitespace-nowrap">{props.nome}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{props.cpf}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{props.dataEmissao}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{props.dataVencimento}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
    );
}