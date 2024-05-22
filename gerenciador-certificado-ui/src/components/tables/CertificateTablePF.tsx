'use client'

import React, { useState } from 'react';
import { CertificadoPF } from '@/resources/certificado-pf/certificado-pf.resources';
import { Button } from '../button/Button';
import { useCertificadoPFService } from '@/resources/certificado-pf/certificado-pf.service';

interface CertificateTablePFProps {
    certificadoPF: CertificadoPF[];
}

export const CertificateTablePF: React.FC<CertificateTablePFProps> = ({ certificadoPF }) => {
    const [certificados, setCertificados] = useState<CertificadoPF[]>(certificadoPF);
    const [confirmDelete, setConfirmDelete] = useState<{ show: boolean, uuid: string | null }>({ show: false, uuid: null });
    const service = useCertificadoPFService();

    async function handleDelete(uuid: string) {
        await service.delete(uuid);
        setCertificados(certificados.filter(cert => cert.uuid !== uuid));
        setConfirmDelete({ show: false, uuid: null });
    }

    const openConfirmDelete = (uuid: string) => {
        setConfirmDelete({ show: true, uuid });
    };

    const closeConfirmDelete = () => {
        setConfirmDelete({ show: false, uuid: null });
    };

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
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Ações
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {certificados.map((props) => (
                        <tr key={props.uuid}>
                            <td className="px-6 py-4 whitespace-nowrap">{props.nome}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{props.cpf}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{props.dataEmissao}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{props.dataVencimento}</td>
                            <td>
                                <Button
                                    type='button'
                                    style='bg-red-500 hover:bg-red-600'
                                    label='Excluir'
                                    onClick={() => openConfirmDelete(props.uuid ?? '')}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {confirmDelete.show && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-70 flex items-center justify-center">
                    <div className="bg-white p-5 rounded-lg w-1/3">
                        <h5 className="text-xl font-bold mb-4">Confirmar Exclusão</h5>
                        <p className="mb-4">Tem certeza que deseja excluir este certificado?</p>
                        <div className="flex justify-end">
                            <Button style='bg-gray-500 hover:bg-gray-600' label='Cancelar' onClick={closeConfirmDelete} />
                            <Button style='ml-3 bg-red-500 hover:bg-red-600' label='Excluir' onClick={() => handleDelete(confirmDelete.uuid ?? '')} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
