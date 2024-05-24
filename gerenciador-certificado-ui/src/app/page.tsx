import Link from 'next/link';
import { ArrowLeftStartOnRectangleIcon, BuildingOfficeIcon, UserCircleIcon, BriefcaseIcon, ClipboardIcon, HomeIcon, ScaleIcon } from '@heroicons/react/24/solid';

interface CardLinkProps {
  href: string;
  title: string;
  Icon: React.ElementType;
}

const CardLink: React.FC<CardLinkProps> = ({ href, title, Icon }) => (
  <Link href={href} passHref>
    <div className="flex flex-col items-center justify-center bg-blue-500 text-white text-center py-10 rounded-lg hover:bg-blue-600 m-2 cursor-pointer transition-all duration-200 w-60 h-60">
      <Icon className="h-12 w-12 mb-4" />
      {title}
    </div>
  </Link>
);

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-950 text-white py-3">
        <div className="container mx-auto flex justify-between items-center px-4">
          <Link href="/" passHref>
            <h1 className="text-3xl font-bold cursor-pointer">QI Assessoria</h1>
          </Link>
          <button className="flex items-center space-x-2 bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600">
            <ArrowLeftStartOnRectangleIcon className="h-6 w-6" />
            <span>Logout</span>
          </button>
        </div>
      </header>
      <main className="flex-grow flex justify-center items-center py-10 bg-gray-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <CardLink href="/PF" title="Pessoa Física" Icon={UserCircleIcon} />
          <CardLink href="/LR" title="Lucro Real" Icon={BuildingOfficeIcon} />
          <CardLink href="/LP" title="Lucro Presumido" Icon={BuildingOfficeIcon} />
          <CardLink href="/MEI" title="MEI" Icon={HomeIcon} />
          <CardLink href="/SIMPLES" title="Simples Nacional" Icon={HomeIcon} />
        </div>
      </main>
      <footer className="bg-blue-950 text-white py-4">
        <div className="container mx-auto text-center">
          <a href="https://github.com/luisfelipe03" target="_blank" rel="noopener noreferrer">
            Desenvolvido por Luis Felipe
          </a>
        </div>
      </footer>
    </div>
  );
}
