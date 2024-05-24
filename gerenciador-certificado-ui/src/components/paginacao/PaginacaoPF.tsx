import React from "react";
import { CertificadoPF } from '@/resources/certificado-pf/certificado-pf.resources'

interface PaginacaoPFProps {
    paginaAtual: number;
    totalPaginas: number;
    onChangePage: (page: number) => void;
    qtdItensPorPagina: number;
}

export const PaginacaoPF: React.FC<PaginacaoPFProps> = ({ paginaAtual, totalPaginas, onChangePage, qtdItensPorPagina }: PaginacaoPFProps) => {

    // Array de páginas
    const paginas = Array.from(Array(totalPaginas).keys());

    return (
        <div className="flex justify-center items-center mt-4 mb-5">
            <button className={`px-4 py-2 rounded-lg ${paginaAtual === 0 ? 'bg-gray-300' : 'bg-blue-500 text-white'}`} onClick={() => onChangePage(paginaAtual - 1)} disabled={paginaAtual === 0}>Anterior</button>
            <div className="mx-4">
                {paginas.map((page) => (
                    <button key={page} className={`px-4 py-2 mr-2 rounded-lg ${paginaAtual === page ? 'bg-blue-500 text-white' : 'bg-gray-300'}`} onClick={() => onChangePage(page)}>{page + 1}</button>
                ))}
            </div>
            <button className={`px-4 py-2 rounded-lg ${paginaAtual === totalPaginas - 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'}`} onClick={() => onChangePage(paginaAtual + 1)} disabled={paginaAtual === totalPaginas - 1}>Próximo</button>
        </div>
    );
}
