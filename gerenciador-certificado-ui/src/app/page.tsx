
import { Template } from '@/components';
import Link from 'next/link';

interface SquareLinkProps {
  href: string;
  title: string;
}

const SquareLink = ({ href, title }: SquareLinkProps) => {
  return (
    <Link href={href}>
      <div className="bg-blue-500 text-white text-center py-20 rounded-lg hover:bg-blue-600 m-2 cursor-pointer w-60">
        {title}
      </div>
    </Link>
  );
};

export default function Home() {
  return (
    <Template>
      <div className="flex justify-center items-center h-screen">
        <div className="flex justify-center space-x-3">
          <SquareLink href="/PF" title="Pessoa Física" />
          <SquareLink href="/LR" title="Lucro Real" />
          <SquareLink href="/LP" title="Lucro Presumido" />
          <SquareLink href="/MEI" title="MEI" />
          <SquareLink href="/SIMPLES" title="Simples Nacional" />
        </div>
      </div>
    </Template>
  );
}

