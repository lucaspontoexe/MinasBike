import React, { useState, useEffect, useContext, createContext } from 'react';
import api from 'services/api';

// baseado em https://usehooks.com/useAuth/

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function getStoredToken() {
  const token = sessionStorage.getItem('token');
  // workaround: restore token to API when loading into state
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  return token || undefined;
}

function useProvideAuth() {
  const [token, setToken] = useState(getStoredToken);

  useEffect(() => {
    
    sessionStorage.setItem('token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    console.log('[useAuth]: changed token to ', token);
    console.log('[useAuth]: axios token is ', api.defaults.headers.common['Authorization']);
    
    return () => {
      sessionStorage.removeItem('token');
    };
  }, [token]);

  function login(values) {
    return new Promise((resolve, reject) => {
      api
        .post('/sessions', values)
        .then(({ data }) => {
          setToken(data.token);
          resolve(data.token);
        })
        .catch(err => reject(err));
    });
  }

  async function signup(values) {
    return api.post('/users', values);
  }

  function logout() {
    setToken(null);
  }

  return { token, login, logout, signup };
}
