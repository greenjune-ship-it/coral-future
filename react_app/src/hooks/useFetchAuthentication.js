import { useEffect } from 'react';
import { checkAuthentication } from 'apis/auth';

const useFetchAuthentication = (backendUrl, setAuthStatus) => {
  useEffect(() => {
    const fetchAuthentication = async () => {
      try {
        const authData = await checkAuthentication(backendUrl);
        setAuthStatus(authData);
      } catch (error) {
        console.error('Error checking authentication:', error);
      }
    };

    fetchAuthentication();
  }, [backendUrl, setAuthStatus]);
};

export default useFetchAuthentication;