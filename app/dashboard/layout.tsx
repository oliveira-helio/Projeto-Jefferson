import Sidebar from '@/components/Dashboard/Sidebar';
import { ProductProvider } from '@/Contexts/ProductsContext';
import { ReactNode } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ProductProvider>
      <div className="flex min-h-screen">
        {/* Menu lateral */}
          <Sidebar/>
        {/* Conteúdo dinâmico */}
        <div className="flex-grow p-6 bg-pink-300">{children}</div>
      </div>
    </ProductProvider>
  );
}
