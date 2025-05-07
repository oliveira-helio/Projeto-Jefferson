'use client';

import { useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/UseCart/useCart';
import { useAuth } from '@/hooks/UseAuth/useAuth';

function Logout() {
  const router = useRouter();
  const { logout } = useAuth();
  const { handleclearLocalCart } = useCart();

  useEffect(() => {
    (async () => {
      try {
        await logout();
        handleclearLocalCart();
        console.log('Logout realizado com sucesso');
        router.push('/');
      } catch (error) {
        console.log('Erro ao realizar logout:', error);
      }
    })();
  }, []); // Executa o logout apenas uma vez, na montagem do componente

  return null;
}

export default Logout;
