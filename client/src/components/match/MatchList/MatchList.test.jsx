import React from 'react';
import { render } from '@testing-library/react';
import MatchList from './index';

describe('MatchList components', () => {
  it('loads item eventually', async () => {
    const { getByText } = render(<MatchList />);
    expect(getByText('팀명2')).toBeintheDocument();
  });
});
