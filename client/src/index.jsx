import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Root from './Root';
import * as workerSetup from './util/workerSetup';

ReactDOM.render(<Root />, document.getElementById('root'));

workerSetup.isExistRegistration().then((isEixst) => {
  const workerAction = isEixst ? workerSetup.updater : workerSetup.register;
  workerAction();
});
