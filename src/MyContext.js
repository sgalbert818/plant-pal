import React, { createContext, useState, useContext } from 'react';

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [user, setUser] = useState(null); // current user
  const [myPlants, setMyPlants] = React.useState(null); // current user list of plants
  const [creating, setCreating] = useState(false); // currently creating new plant
  const [focus, setFocus] = React.useState(null); // show plant details
  const [isEditing, setIsEditing] = React.useState(false) // currently editing plant

  const value = {
    user,
    setUser,
    myPlants,
    setMyPlants,
    creating,
    setCreating,
    focus,
    setFocus,
    isEditing,
    setIsEditing
  };

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

export const useMyContext = () => {
  return useContext(MyContext);
};