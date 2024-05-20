'use client'

import React from 'react';
import { CertificadoPJ } from '@/resources/certificado-pj/certificado-pj.resources';

interface CertificateTablePJProps {
    CertificadoPJ: CertificadoPJ[];
}

export const CertificateTablePJ: React.FC<CertificateTablePJProps> = ({ CertificadoPJ }) => {
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
                  {CertificadoPJ.map((certificado) => (
                      <tr key={certificado.uuid}>
                          <td className="px-6 py-4 whitespace-nowrap">{certificado.razaoSocial}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{certificado.cnpj}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{certificado.dataEmissao}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{certificado.dataVencimento}</td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
  );
};