"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';
import { signUp, logIn } from '@utils/userAuth'

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const Auth = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); 
    }
  }, []);

  const onAuth = (User) => {
    setUser(User);
    localStorage.setItem('user', JSON.stringify(User));
  }
  const logOut = () => {
    setUser(null);
    localStorage.removeItem('user');
  }

  return (
    <AuthContext.Provider value={{ user, signUp, onAuth, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
