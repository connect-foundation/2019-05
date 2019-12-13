import React from 'react';
import { FilterProvider } from './Filter';
import { SideBarProvider } from './SideBar';
import { UserProvider } from './User';

const ProviderWrapper = ({ children }) => {
  return (
    <UserProvider>
      <SideBarProvider>
        <FilterProvider>{children}</FilterProvider>
      </SideBarProvider>
    </UserProvider>
  );
};

export default ProviderWrapper;
