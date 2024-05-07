'use client'

import { Template } from '@/components'
import { CertificadoPF } from '@/resources/certificado-pf/certificado-pf.resources'
import { useCertificadoPFService } from '@/resources/certificado-pf/certificado-pf.service'
import { useState, useEffect } from 'react' 

export default function PessoaFisicaPage() {
  
    const useService = useCertificadoPFService();
    const [certificados, setCertificados] = useState<CertificadoPF[]>([]);

    async function loadCertificados() {
        const data = await useService.getAll();
        setCertificados(data);
        console.table(data);
    }

    useEffect(() => {
        loadCertificados();
    }, []);

    function renderCertificado() {
        return certificados.map(certificado => (
            <li key={certificado.uuid}>CPF: {certificado.cpf} / Nome: {certificado.nome}</li>
        ))
    }

    return (
        <Template>
            <div>
                <h1>Certificados Pesso Fisica</h1>
                <ul>
                    {renderCertificado()}
                </ul>
            </div>
        </Template>
    )

}