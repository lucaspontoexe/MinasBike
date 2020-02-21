import React, { useState, useContext, createContext } from 'react';
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

function useProvideAuth() {
  const [token, setToken] = useState(null);

  function login(values) {
    return new Promise((resolve, reject) => {
      api
        .post('/sessions', values)
        .then(({ data }) => {
          setToken(data.token);
          api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
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
