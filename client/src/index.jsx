import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Root from './Root';
import * as workerSetup from './util/workerSetup';

ReactDOM.render(<Root />, document.getElementById('root'));

if (workerSetup.isExistRegistration()) {
  workerSetup.unregister();
}
workerSetup.register();
