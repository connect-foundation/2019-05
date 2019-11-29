import React, { createContext, useState } from 'react';

const UserContext = createContext({});

const UserProvider = ({ children }) => {
  const initialState = {
    isLoggedIn: false,
  };
  const [state, setState] = useState(initialState);

  return (
    <UserContext.Provider value={[state, setState]}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
