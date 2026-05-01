import React, { createContext, useContext, useEffect, useState } from 'react';
import * as api from '../services/api.js';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const { token, user: userData } = api.getAuthData();
    
    if (token && userData) {
      setUser(userData);
      setIsAuthenticated(true);
    }
    
    setLoading(false);
  }, []);

  const signup = async (email, password, name, phone = '', city = '') => {
    const { user: newUser, token } = await api.authAPI.signup(
      email,
      password,
      name,
      phone,
      city
    );
    api.saveAuthData(token, newUser);
    setUser(newUser);
    setIsAuthenticated(true);
    return newUser;
  };

  const login = async (email, password) => {
    const { user: loggedInUser, token } = await api.authAPI.login(email, password);
    api.saveAuthData(token, loggedInUser);
    setUser(loggedInUser);
    setIsAuthenticated(true);
    return loggedInUser;
  };

  const logout = () => {
    api.clearAuthData();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        signup,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
