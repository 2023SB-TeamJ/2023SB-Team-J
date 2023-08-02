/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (localStorage.getItem('access')) setIsLoggedIn(true);
    else setIsLoggedIn(false);

    setIsLoginLoading(false);
  }, [location.pathname]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, isLoginLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
