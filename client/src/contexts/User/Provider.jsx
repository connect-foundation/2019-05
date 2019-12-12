import React, { useReducer } from 'react';
import Reducer from './Reducer';
import initialState from './InitialState';
import Context from './Context';

const Provider = ({ children }) => {
  const [userState, userDispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={{ userState, userDispatch }}>
      {children}
    </Context.Provider>
  );
};

export default Provider;
