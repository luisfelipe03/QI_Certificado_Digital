'use client'

import { Template, CertificateTablePJ } from '@/components'
import { CertificadoPJ } from '@/resources/certificado-pj/certificado-pj.resources'
import { useCertificadoPJService } from '@/resources/certificado-pj/certificado-pj.service'
import { useState, useEffect } from 'react' 

export default function LucroPresumidoPage() {
  
    const useService = useCertificadoPJService();
    const [certificados, setCertificados] = useState<CertificadoPJ[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    async function loadCertificados() {
        setLoading(true);
        const data = await useService.getAllByTipo("LR");
        setCertificados(data);
        setLoading(false);
    }

    useEffect(() => {
        loadCertificados();
    }, []);

    function renderCertificado(certificado: CertificadoPJ) {
        return (
           <CertificateTablePJ
                key={certificado.uuid}
                razaoSocial={certificado.razaoSocial}
                cnpj={certificado.cnpj}
                dataEmissao={certificado.dataEmissao}
                dataVencimento={certificado.dataVencimento}
            /> 
        );
    }

    function renderCertificateTable() {
        return certificados.map((certificado: CertificadoPJ) => renderCertificado(certificado)) 
    }

    return (
        <Template loading={loading}>
            <div>
                
            <section className='flex items-center justify-between my-5'>
                <div className='flex'>
                    <h1 className="text-left text-2xl font-semibold text-gray-800">Certificados Lucro Real</h1>
                </div>
                <div className='flex space-x-4 items-center'>
                    <input type="text" placeholder='Razão Social' className='border px-5 py-2 rounded-lg text-gray-900' />
                    <button className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600' onClick={loadCertificados}>Buscar</button>
                    <button className='bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600'>Adicionar</button>
                </div>
                </section>

                <ul>
                    {renderCertificateTable()}
                </ul>
            </div>
        </Template>
    )

}