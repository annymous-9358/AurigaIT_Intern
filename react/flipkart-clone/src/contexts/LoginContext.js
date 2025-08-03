import React, { createContext, useContext, useState, useEffect } from 'react';

const LoginContext = createContext();

export const useLogin = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error('useLogin must be used within a LoginProvider');
  }
  return context;
};

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Load login state from localStorage on component mount
  useEffect(() => {
    const savedLoginState = localStorage.getItem('flipkart_logged_in');
    const savedUser = localStorage.getItem('flipkart_user');
    
    if (savedLoginState === 'true') {
      setIsLoggedIn(true);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    }
  }, []);

  const login = (userInfo = null) => {
    setIsLoggedIn(true);
    if (userInfo) {
      setUser(userInfo);
      localStorage.setItem('flipkart_user', JSON.stringify(userInfo));
    } else {
      // Default user for demo
      const defaultUser = { name: 'User', email: 'user@example.com' };
      setUser(defaultUser);
      localStorage.setItem('flipkart_user', JSON.stringify(defaultUser));
    }
    localStorage.setItem('flipkart_logged_in', 'true');
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('flipkart_logged_in');
    localStorage.removeItem('flipkart_user');
  };

  const toggleLogin = () => {
    if (isLoggedIn) {
      logout();
    } else {
      login();
    }
  };

  const handleUserAction = (action) => {
    if (action === 'Logout') {
      logout();
    }
    // Handle other actions in the future if needed
  };

  const userDropdownItems = [
    'My Profile',
    'Orders',
    'Wishlist',
    'Logout'
  ];

  const value = {
    isLoggedIn,
    user,
    login,
    logout,
    toggleLogin,
    userDropdownItems,
    handleUserAction
  };

  return (
    <LoginContext.Provider value={value}>
      {children}
    </LoginContext.Provider>
  );
};
