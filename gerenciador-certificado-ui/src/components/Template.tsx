import { ToastContainer } from 'react-toastify'
import Link from 'next/link';

interface TemplateProps {
    children: React.ReactNode;
    loading?: boolean;
    footerModel: number;
}


export const Template: React.FC<TemplateProps> = ({ children, loading, footerModel = 1 }) => {
    return (
        <>
            <Header />
            <div className="container mx-auto mt-8 px-4 text-black">
                {loading && (
                    <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500 border-solid mr-3"></div>
                        <span className="text-gray-600 font-semibold">Carregando...</span>
                    </div>
                )}
                {!loading && children}
            </div>
            <ToastContainer position='top-right'
                            autoClose={8000}
                            hideProgressBar={false}
                            draggable={false}
                            closeOnClick={true}
                            pauseOnHover={true}
            />
        </>
    );
}


interface RenderIfProps {
    condition?: boolean;
    children: React.ReactNode;
}

export const RenderIf: React.FC<RenderIfProps> = ({condition = true, children}) => {

    if(condition){
        return children
    }

    return false;
}

const Header: React.FC = () => {
    return (
        <header className="bg-indigo-950 text-white py-3" >
            <div className="container mx-auto flex justofy-between items-center px-4">
                <Link href="/" passHref>
                    <h1 className="text-3xl font-bold">QI Assessoria</h1>
                </Link>
            </div>
        </header>
    );
}

const Footer: React.FC = () => {
    return (
        <footer className="bg-indigo-950 text-white py-4 mt-8 fixed bottom-0 w-full" >
            <div className="container mx-auto text-center">
                <a href="https://github.com/luisfelipe03" target="_blank">Desenvolvido por Luis Felipe</a>
            </div>
        </footer>
    );
}

const Footer2: React.FC = () => {
    return (
        <footer className="bg-indigo-950 text-white py-4 mt-8" >
            <div className="container mx-auto text-center">
                <a href="https://github.com/luisfelipe03" target="_blank">Desenvolvido por Luis Felipe</a>
            </div>
        </footer>
    );
}
