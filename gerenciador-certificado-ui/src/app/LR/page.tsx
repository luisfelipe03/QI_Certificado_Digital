'use client'

import { Template } from '@/components'
import { CertificadoPJ } from '@/resources/certificado-pj/certificado-pj.resources'
import { useCertificadoPJService } from '@/resources/certificado-pj/certificado-pj.service'
import { useState, useEffect } from 'react' 

export default function LucroRealPage() {
  
    const useService = useCertificadoPJService();
    const [certificados, setCertificados] = useState<CertificadoPJ[]>([]);

    async function loadCertificados() {
        const data = await useService.getAllByTipo("LR");
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
                <h1>Certificados Lucro Real</h1>
                <ul>
                    {renderCertificado()}
                </ul>
            </div>
        </Template>
    )

}