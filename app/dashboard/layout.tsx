'use client';

import Sidebar from '@/components/Dashboard/Sidebar';
import { useAuth } from '@/hooks/UseAuth/useAuth';
import ProductsProvider from '@/providers/ProductsProvider/ProductsProvider';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ReactNode, useState, useEffect } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { isAdmin } = useAuth();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setIsMobile(window.innerWidth < 768);
  }, []);

  if (isAdmin === undefined) return null;

  return (
    <ProductsProvider>
      {isAdmin ? (
        <div className="flex min-h-screen">
          {isClient && !isMobile && <Sidebar />}
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
          </div>
        </div>
      )}
    </ProductsProvider>
  );
}
