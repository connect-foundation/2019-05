import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { FilterProvider } from './contexts/Filter/Context';
import { SideBarProvider } from './contexts/SideBar/Context';
import { PlayerProvider } from './contexts/User/Context';
import App from './App';

const Root = () => (
  <BrowserRouter>
    <PlayerProvider>
      <SideBarProvider>
        <FilterProvider>
          <App />
        </FilterProvider>
      </SideBarProvider>
    </PlayerProvider>
  </BrowserRouter>
);

export default Root;
