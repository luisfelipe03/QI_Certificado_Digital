'use client'

import { Template, CertificateTablePF } from '@/components'
import { CertificadoPF } from '@/resources/certificado-pf/certificado-pf.resources'
import { useCertificadoPFService } from '@/resources/certificado-pf/certificado-pf.service'
import { useState, useEffect } from 'react' 

export default function PessoaFisicaPage() {
  
    const useService = useCertificadoPFService();
    const [certificados, setCertificados] = useState<CertificadoPF[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');

    async function loadCertificados() {
        setLoading(true);
        const data = await useService.getAll();
        setCertificados(data);
        setLoading(false);
    }

    useEffect(() => {
        loadCertificados();
    }, []);

    function renderCertificado() {
        return (
            <CertificateTablePF 
                certificadoPF={certificados}
            />
        )
    }

    return (
        <Template loading={loading}>
            <div>
                
            <section className='flex items-center justify-between my-5'>
                <div className='flex'>
                    <h1 className="text-left text-2xl font-semibold text-gray-800">Certificados Pessoa Física</h1>
                </div>
                <div className='flex space-x-4 items-center'>
                    <input onChange={e => setSearch(e.target.value)} type="text" placeholder='Nome' className='border px-5 py-2 rounded-lg text-gray-900' />
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