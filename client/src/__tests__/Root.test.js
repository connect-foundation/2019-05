import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Root from '../Root';

it('test example', () => {
	const { queryByText } = render(<Root />);
	expect(queryByText('Hello, samrho')).toBeInTheDocument();
});
