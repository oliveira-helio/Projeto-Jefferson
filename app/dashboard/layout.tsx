'use client';

import Sidebar from '@/components/Dashboard/Menus/DashboardSidebar';
import Button from '@/components/MicroComponents/Default/Button';
import { useAuth } from '@/hooks/UseAuth/useAuth';
import { useMobile } from '@/hooks/UseMobile/useMobile';
import ProductsProvider from '@/providers/ProductsProvider/ProductsProvider';
import Image from 'next/image';
import { ReactNode, useState, useEffect } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { isMobile } = useMobile();
  const { isAdmin } = useAuth();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    console.log('isMobile:', isMobile);
    console.log('isClient:', isClient);
  }, [isMobile, isClient]);


  if (isAdmin === undefined) return null;

  return (
    <ProductsProvider>
      {isAdmin ? (
        <div className="flex min-h-screen">
          {isClient && !isMobile ? <Sidebar /> : null}
          <div className="flex-grow p-6 bg-pink-300">{children}</div>
        </div>
      ) : (
        <div className="flex items-center justify-center bg-slate-200 h-screen flex-col w-full bg-opacity-50">
          <div className="flex flex-col fixed z-40 gap-4 justify-center items-center w-fit p-6 rounded-lg shadow-lg bg-pink-200 min-h-[25%]">
            <Image
              src="/assets/img/acesso-negado.png"
              alt="Imagem de acesso negado"
              className="rounded-xl aspect-square object-cover"
              width={200}
              height={200}
            />
            <h1 className="text-pink-500 font-bold text-4xl">Acesso Negado</h1>

            <h2 className="text-pink-500 font-bold text-2xl">Você não tem permissão para acessar esta área.</h2>
            <p className="text-gray-700 mt-2">Por favor, entre em contato com o administrador do sistema.</p>
            <Button
              label='voltar para a página inicial'
              onClick={() => window.location.href = '/'}
            />
          </div>
        </div>
      )}
    </ProductsProvider>
  );
}
