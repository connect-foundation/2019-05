import React from 'react';
import ReactDOM from 'react-dom';
import App from './index';
import { BrowserRouter } from 'react-router-dom';
it('renders without crashing', () => {
  const div = document.createElement('div');
  const AppInRouter = (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  ReactDOM.render(AppInRouter, div);
  ReactDOM.unmountComponentAtNode(div);
});
