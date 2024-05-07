'use client'

import { Template } from '@/components'
import { CertificadoPJ } from '@/resources/certificado-pj/certificado-pj.resources'
import { useCertificadoPJService } from '@/resources/certificado-pj/certificado-pj.service'
import { useState, useEffect } from 'react' 

export default function LucroPresumidoPage() {
  
    const useService = useCertificadoPJService();
    const [certificados, setCertificados] = useState<CertificadoPJ[]>([]);

    async function loadCertificados() {
        const data = await useService.getAllByTipo("LP");
        setCertificados(data);
        console.table(data);
    }

    useEffect(() => {
        loadCertificados();
    }, []);

    function renderCertificado() {
        return certificados.map(certificado => (
            <li key={certificado.uuid}>CNPJ: {certificado.cnpj} / Razão Social: {certificado.razaoSocial}</li>
        ))
    }

    return (
        <Template>
            <div>
                <h1>Certificados Lucro Presumido</h1>
                <ul>
                    {renderCertificado()}
                </ul>
            </div>
        </Template>
    )

}