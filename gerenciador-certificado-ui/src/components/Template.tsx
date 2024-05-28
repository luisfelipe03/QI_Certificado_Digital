import { ToastContainer } from 'react-toastify'
import Link from 'next/link';
import Image from 'next/image';

interface TemplateProps {
    children: React.ReactNode;
    loading?: boolean;
}


export const Template: React.FC<TemplateProps> = ({ children, loading}) => {
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
        <header className="bg-blue-950 text-white py-3" >
            <div className="container mx-auto flex justofy-between items-center px-4">
                <Link href="/" passHref>
                    <Image src="/images/logo.png" alt="Logo" width={120} height={40} />
                </Link>
            </div>
        </header>
    );
}
