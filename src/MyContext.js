import React, { createContext, useState, useContext } from 'react';

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const value = {
    user,
    setUser,
  };

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

export const useMyContext = () => {
  return useContext(MyContext);
};