'use client';
import Sidebar from '@/components/Dashboard/Sidebar';
import { useAuth } from '@/Contexts/AuthContext';
import { ProductProvider } from '@/Contexts/ProductsContext';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ReactNode, use, useEffect } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode; }) {
  const { isAdmin } = useAuth();
  const router = useRouter();

  // useEffect(() => {
  //   if (typeof window !== 'undefined' && !isAdmin) {
  //     router.push('/');
  //   }
  // }, [isAdmin]);
    
  return (
    <ProductProvider>
      {isAdmin && (
        <div className="flex min-h-screen">
          {/* Menu lateral */}
          <Sidebar />
          {/* Conteúdo dinâmico */}
          <div className="flex-grow p-6 bg-pink-300">{children}</div>
        </div>
      )}

      {!isAdmin && (
        <div className='fex items-center justify-center bg-slate-200 h-screen flex flex-col w-full bg-opacity-50'>
          <div className="flex flex-col fixed z-40 gap-4 justify-center items-center w-fit p-6 rounded-lg shadow-lg bg-pink-200 min-h-[25%]">
            <Image 
              src={"/assets/img/acesso-negado.png"}
              alt="Imagem de acesso negado"
              className="rounded-xl aspect-square  object-cover"
              width={200}
              height={200}
            />
            <h1 className="self-center text-pink-500 font-bold text-4xl z-10 w-fit">
              Acesso Negado
            </h1>
          </div>
        </div>
      )}
    </ProductProvider>
  );
}
