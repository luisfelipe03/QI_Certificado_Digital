'use client'

import { Template, CertificateTablePJ, InputPJModal } from '@/components'
import { CertificadoPJ } from '@/resources/certificado-pj/certificado-pj.resources'
import { useCertificadoPJService } from '@/resources/certificado-pj/certificado-pj.service'
import { useState, useEffect } from 'react' 
import { toast } from 'react-toastify';
import Link from 'next/link'

export default function LucroPresumidoPage() {
  
    const useService = useCertificadoPJService();
    const [certificados, setCertificados] = useState<CertificadoPJ[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');
    const [searchType, setSearchType] = useState<'razao' | 'cnpj'>('razao');
    const [inputValue, setInputValue] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);

    async function loadCertificados(query: string = '', type: 'razao' | 'cnpj' = 'razao') {
        setLoading(true);
        let data: CertificadoPJ[];

        if (query === '') {
            data = await useService.getAllByTipo('SIMPLES');
        } else if (type === 'razao') {
            const result = await useService.getByRazaoAndTipo(query, 'SIMPLES');
            data = Array.isArray(result) ? result : [result]; // Certificar-se de que data é sempre um array
        } else {
            const result = await useService.getByCnpjAndTipo(query, 'SIMPLES');
            data = Array.isArray(result) ? result : [result]; // Certificar-se de que data é sempre um array
        }

        setCertificados(data);
        setLoading(false);
    }

    useEffect(() => {
        loadCertificados(search, searchType);
    }, []);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
    
        if (searchType === 'cnpj') {
            // Remover caracteres não numéricos
            value = value.replace(/\D/g, '');
            // Aplicar a formatação de CNPJ
            value = value.replace(/^(\d{2})(\d)/, '$1.$2')
                         .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
                         .replace(/\.(\d{3})(\d)/, '.$1/$2')
                         .replace(/(\d{4})(\d)/, '$1-$2');
        }
    
        setInputValue(value);
    };
    
    const handleSearchTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchType(e.target.value as 'razao' | 'cnpj');
        setInputValue(''); // Limpar o campo de entrada quando o tipo de busca mudar
    }

    const handleSearch = () => {
    
        if (searchType === 'cnpj' && inputValue.replace(/\D/g, '').length !== 14) {
            toast.warn('Por favor, insira um CNPJ válido.');
            return;
        }
    
        setSearch(inputValue);
        loadCertificados(inputValue, searchType);
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
                        <h1 className="text-left text-2xl font-semibold text-gray-800">Certificados Simples Nacional</h1>
                    </div>
                    <div className='flex space-x-4 items-center'>
                        <div className='relative'>
                        <select 
                                value={searchType}
                                onChange={handleSearchTypeChange}
                                className='border px-4 py-2 rounded-l-lg text-gray-900'
                            >
                                <option value='razao'>Razão Social</option>
                                <option value='cnpj'>CNPJ</option>
                            </select>
                            <input 
                                value={inputValue}
                                onChange={handleSearchChange}
                                onKeyDown={handleKeyDown}
                                type="text"
                                placeholder={searchType === 'razao' ? 'Razão Social' : 'CNPJ'}
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
                        <InputPJModal open={open} setOpen={setOpen} />
                    </div>
                </section>

                <ul>
                    <CertificateTablePJ certificadoPJ={certificados} />
                </ul>
            </div>
        </Template>
    )

}