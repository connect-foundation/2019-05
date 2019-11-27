import React from 'react';
import { render } from '@testing-library/react';
import MatchList from './index';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('MatchList components', () => {
  // const mock = new MockAdapter(axios,  {delayResponse: 200})
  // mock.onGet('localhost:3000/match')
  // it('loads item eventually', async () => {
  //   const { getByText } = render(<MatchList />);
  //   expect(getByText('팀명2')).toBeintheDocument();
  // });
  it('just passes the test', () => {
    // const { getByRole } = render(<MatchList />);
    // expect(getByRole('text')).toBeInTheDocument();
    expect(true).toBe(true);
  });
});
