import React from "react";
import { CertificadoPJ } from '@/resources/certificado-pj/certificado-pj.resources'

interface PaginacaoPJProps {
    certificados: CertificadoPJ[];
    paginaAtual: number;
    totalPaginas: number;
    onChangePage: (page: number) => void;
    qtdItensPorPagina: number;
}

export const PaginacaoPJ: React.FC<PaginacaoPJProps> = ({certificados, paginaAtual, totalPaginas, onChangePage, qtdItensPorPagina} : PaginacaoPJProps) => {
    const paginas = Array.from(Array(totalPaginas).keys());

    return (
        <div className="flex justify-center items-center mt-4">
            <button className={`px-4 py-2 rounded-lg ${paginaAtual === 0 ? 'bg-gray-300' : 'bg-blue-500 text-white'}`} onClick={() => onChangePage(paginaAtual - 1)} disabled={paginaAtual === 0}>Anterior</button>
            <div className="mx-4">
                {paginas.map((page) => (
                    <button key={page} className={`px-4 py-2 rounded-lg ${paginaAtual === page ? 'bg-blue-500 text-white' : 'bg-gray-300'}`} onClick={() => onChangePage(page)}>{page + 1}</button>
                ))}
            </div>
            <button className={`px-4 py-2 rounded-lg ${paginaAtual === totalPaginas - 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'}`} onClick={() => onChangePage(paginaAtual + 1)} disabled={paginaAtual === totalPaginas - 1}>Próximo</button>
        </div>
    );
}