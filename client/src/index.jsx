import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Root from './Root';
import workerSetup from './util/workerSetup';

ReactDOM.render(<Root />, document.getElementById('root'));

workerSetup();
