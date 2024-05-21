'use client'

import { Template, CertificateTablePJ } from '@/components'
import { CertificadoPJ } from '@/resources/certificado-pj/certificado-pj.resources'
import { useCertificadoPJService } from '@/resources/certificado-pj/certificado-pj.service'
import { useState, useEffect } from 'react' 
import Link from 'next/link'

export default function SimplesNacionalPage() {
  
    const useService = useCertificadoPJService();
    const [certificados, setCertificados] = useState<CertificadoPJ[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    async function loadCertificados() {
        setLoading(true);
        const data = await useService.getAllByTipo("SIMPLES");
        setCertificados(data);
        setLoading(false);
    }

    useEffect(() => {
        loadCertificados();
    }, []);

    function renderCertificado() {
        return (
           <CertificateTablePJ
                CertificadoPJ={certificados}
            /> 
        );
    }

    return (
        <Template footerModel={2} loading={loading}>
            <div className='flex items-center justify-start mb-4'>
                <Link href="/" passHref>
                    <div className='text-blue-500 hover:underline flex items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Voltar para Home
                    </div>
                </Link>
            </div>
            <div>
                
            <section className='flex items-center justify-between my-5'>
                <div className='flex'>
                    <h1 className="text-left text-2xl font-semibold text-gray-800">Certificados Simples Nacional</h1>
                </div>
                <div className='flex space-x-4 items-center'>
                    <input type="text" placeholder='Razão Social' className='border px-5 py-2 rounded-lg text-gray-900' />
                    <button className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600' onClick={loadCertificados}>Buscar</button>
                    <button className='bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600'>Adicionar</button>
                </div>
                </section>

                <ul>
                    {renderCertificado()}
                </ul>
            </div>
        </Template>
    )

}