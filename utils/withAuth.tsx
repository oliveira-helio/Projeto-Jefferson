// utils/withAuth.tsx
import { useContext } from 'react';
import { AuthContext } from '@/Contexts/AuthContext';

const withAuth = (Component: React.FC) => {
  return function AuthenticatedComponent(props: any) {
    const { isAuthenticated } = useContext(AuthContext);

    if (!isAuthenticated) {
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      return null;
    }

    return <Component {...props} />;
  };
};

export default withAuth;
