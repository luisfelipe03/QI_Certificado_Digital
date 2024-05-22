'use client'

import { Template, CertificateTablePF, InputPFModal } from '@/components';
import { CertificadoPF } from '@/resources/certificado-pf/certificado-pf.resources';
import { useCertificadoPFService } from '@/resources/certificado-pf/certificado-pf.service';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PessoaFisicaPage() {
    const useService = useCertificadoPFService();
    const [certificados, setCertificados] = useState<CertificadoPF[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');
    const [inputValue, setInputValue] = useState<string>('');
    const [searchType, setSearchType] = useState<'name' | 'cpf'>('name'); // Novo estado para tipo de busca
    const [open, setOpen] = useState<boolean>(false);

    async function loadCertificados(query: string = '', type: 'name' | 'cpf' = 'name') {
        setLoading(true);
        let data: CertificadoPF[]; // Definir data como um array de CertificadoPF
    
        if (query === '') {
            data = await useService.getAll();
        } else if (type === 'name') {
            const result = await useService.getByName(query);
            data = Array.isArray(result) ? result : [result]; // Certificar-se de que data é sempre um array
        } else {
            const result = await useService.getByCpf(query);
            data = Array.isArray(result) ? result : [result]; // Certificar-se de que data é sempre um array
        }
    
        setCertificados(data);
        setLoading(false);
    };
    

    useEffect(() => {
        loadCertificados(search, searchType);
    }, []);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;

        if (searchType === 'cpf') {
            // Remover caracteres não numéricos
            value = value.replace(/\D/g, '');
            // Aplicar a formatação de CPF
            value = value.replace(/(\d{3})(\d)/, '$1.$2')
                         .replace(/(\d{3})(\d)/, '$1.$2')
                         .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        }

        setInputValue(value);
    };

    const handleSearchTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchType(e.target.value as 'name' | 'cpf');
        setInputValue(''); // Limpar o campo de entrada quando o tipo de busca mudar
    };

    const handleSearch = () => {
        if (searchType === 'cpf' && inputValue.replace(/\D/g, '').length !== 11) {
            toast.warn('Por favor, insira um CPF completo.');
            return;
        }
        setSearch(inputValue);
        loadCertificados(inputValue, searchType);
        console.log(certificados);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const clearSearch = () => {
        setInputValue('');
        setSearch('');
        loadCertificados('');
    };

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
                        <h1 className="text-left text-2xl font-semibold text-gray-800">Certificados Pessoa Física</h1>
                    </div>
                    <div className='flex space-x-4 items-center'>
                        <div className='relative'>
                            <select 
                                value={searchType}
                                onChange={handleSearchTypeChange}
                                className='border px-4 py-2 rounded-l-lg text-gray-900'
                            >
                                <option value='name'>Nome</option>
                                <option value='cpf'>CPF</option>
                            </select>
                            <input 
                                value={inputValue}
                                onChange={handleSearchChange}
                                onKeyDown={handleKeyDown}
                                type="text"
                                placeholder={searchType === 'name' ? 'Nome' : 'CPF'}
                                className='border px-5 py-2 rounded-r-lg text-gray-900'
                            />
                            {inputValue && (
                                <button onClick={clearSearch} className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>
                        <button className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600' onClick={handleSearch}>Buscar</button>
                        <button className='bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600' onClick={() => setOpen(true)}>Adicionar</button>
                        <InputPFModal open={open} setOpen={setOpen} />
                    </div>
                </section>

                <ul>
                    <CertificateTablePF certificadoPF={certificados} />
                </ul>
            </div>
        </Template>
    );
}
