import React from 'react';
import './App.scss';
import {Header, Footer} from '../components/common';
import Profile from '../Profile';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Profile username="seungnam2" name="노승남" />
      <Footer />
    </div>
  );
};

export default App;
