import React, { createContext, useState } from 'react';

const SideBarContext = createContext();

const SideBarProvider = ({ children }) => {
  const [activated, setActivated] = useState(false);
  return (
    <SideBarContext.Provider value={{ activated, setActivated }}>
      {children}
    </SideBarContext.Provider>
  );
};
export { SideBarContext, SideBarProvider };
