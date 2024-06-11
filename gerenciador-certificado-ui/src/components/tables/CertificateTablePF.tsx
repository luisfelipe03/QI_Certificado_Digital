'use client'

import React, { useState, useEffect } from 'react';
import { CertificadoPF } from '@/resources/certificado-pf/certificado-pf.resources';
import { Button } from '../button/Button';
import { useCertificadoPFService } from '@/resources/certificado-pf/certificado-pf.service';
import { toast } from 'react-toastify';
import { RenderIf } from '..';
import { differenceInDays, isBefore } from 'date-fns';

interface CertificateTablePFProps {
    certificadoPF: CertificadoPF[];
}

export const CertificateTablePF: React.FC<CertificateTablePFProps> = ({ certificadoPF }) => {
    const [certificados, setCertificados] = useState<CertificadoPF[]>(certificadoPF || []);
    const [confirmDelete, setConfirmDelete] = useState<{ show: boolean, uuid: string | null }>({ show: false, uuid: null });
    const service = useCertificadoPFService();

    useEffect(() => {
        setCertificados(Array.isArray(certificadoPF) ? certificadoPF : []);
    }, [certificadoPF]);

    async function handleDelete(uuid: string) {
        try {
            await service.delete(uuid);
            setCertificados(certificados.filter(cert => cert.uuid !== uuid));
            toast.success('Certificado excluído com sucesso!');
        } catch (error) {
            toast.error('Erro ao excluir o certificado. Tente novamente.');
        } finally {
            setConfirmDelete({ show: false, uuid: null });
        }
    }

    function parseDateString(dateString: any) {
        const [day, month, year] = dateString.split('/').map(Number);
        // O JavaScript Date usa meses baseados em zero (0 = janeiro, 11 = dezembro)
        return new Date(year, month - 1, day);
    }
    
    function isDueInOneMonthOrLess(dataVencimento: any) {
        const hoje = new Date();
        const dataVenc = parseDateString(dataVencimento);
    
        // Verifica se a data de vencimento já passou
        if (isBefore(dataVenc, hoje)) {
            return false;
        }
    
        // Verifica se falta um mês ou menos para a data de vencimento
        const diasRestantes = differenceInDays(dataVenc, hoje);
        return diasRestantes <= 30;
    }

    const openConfirmDelete = (uuid: string) => {
        setConfirmDelete({ show: true, uuid });
    };

    const closeConfirmDelete = () => {
        setConfirmDelete({ show: false, uuid: null });
    };

    const renderTableRows = () => {
        if (!Array.isArray(certificados)) {
            return null;
        }

        return certificados.map((props) => (
            <tr key={props.uuid}>
                <td className="px-6 py-4 whitespace-nowrap">
                    {props.nome} 
                    <RenderIf condition={!props.valido}>
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            Vencido
                        </span>
                    </RenderIf>
                    <RenderIf condition={isDueInOneMonthOrLess(props.dataVencimento)}>
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Vence em 1 mês ou menos
                        </span>
                    </RenderIf>
                </td>
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
        ));
    };

    return (
        <div className="overflow-x-auto">
            {certificados.length === 0 || !certificados[0].nome ? (
                <div className="text-center py-4">
                    <p className="text-gray-500">Nenhum certificado encontrado.</p>
                </div>
            ) : (
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
                        {renderTableRows()}
                    </tbody>
                </table>
            )}

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
