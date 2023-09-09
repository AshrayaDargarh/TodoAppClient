import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const navigate=useNavigate()

    useEffect(()=>{
        const token=localStorage.getItem('token')
        if(token)
            setIsLoggedIn(true)
    },[])
  
    const login = (token) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/')
    setIsLoggedIn(false);
  };

  const contextValue = {
    isLoggedIn,
    login,
    logout,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
