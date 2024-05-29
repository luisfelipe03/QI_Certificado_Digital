'use client';

import Image from "next/image";
import Link from "next/link";
import { AuthenticatedPage } from "@/components";

export default function NotFoundPage() {
    return (
        <AuthenticatedPage>
            <div className="min-h-screen flex flex-col">
                <header className="bg-blue-950 text-white py-3">
                    <div className="container mx-auto flex justify-between items-center px-4">
                        <Link href="/certificados">
                            <Image src="/images/logo.png" alt="Logo" width={120} height={40} />
                        </Link>
                    </div>
                </header>

                <main className="flex-grow flex flex-col justify-center items-center text-center px-4">
                    <h1 className="text-4xl font-bold mb-4 text-gray-800">Página não encontrada</h1>
                    <p className="text-lg mb-8 text-gray-600">Desculpe, a página que você está procurando não existe.</p>
                    <Link href="/" legacyBehavior>
                        <a className="bg-blue-950 text-white py-2 px-4 rounded hover:bg-blue-900 transition duration-300">
                            Voltar para a Home
                        </a>
                    </Link>
                </main>

                <footer className="bg-blue-950 p-4">
                    <div className="container mx-auto text-center text-white">
                        &copy; 2024 QI Assessoria. Todos os direitos reservados.
                    </div>
                </footer>
            </div>
        </AuthenticatedPage>
    );
}
