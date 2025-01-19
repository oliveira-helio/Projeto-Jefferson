'use client'

import { useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/Contexts/AuthContext';

function Logout() {
  const router = useRouter();
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      try {
        await logout();
        console.log("Logout realizado com sucesso");
        router.push('/');
      } catch (error) {
        console.log("Erro ao realizar logout:", error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Remove 'logout' e 'router' do array de dependências para evitar loops

  return null;
}

export default Logout;
