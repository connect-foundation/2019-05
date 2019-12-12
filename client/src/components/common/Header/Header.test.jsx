import React from 'react';
import { render } from '@testing-library/react';
import { FilterProvider } from '../../../contexts/Filter/Context';
import { BrowserRouter } from 'react-router-dom';
import {
  SideBarProvier,
  SideBarProvider,
} from '../../../contexts/SideBar/Context';
import Header from '.';

describe('Header component', () => {
  it('renders correctly with the context', () => {
    const { container } = render(
      <BrowserRouter>
        <SideBarProvider>
          <FilterProvider>
            <Header />
          </FilterProvider>
        </SideBarProvider>
      </BrowserRouter>
    );
    expect(container).toBeInTheDocument();
  });
});
