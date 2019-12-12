import React, { useReducer } from 'react';
import Reducer from './Reducer';
import initialState from './InitialState';
import Context from './Context';

const Provider = ({ children }) => {
  const [matchState, matchDispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={{ matchState, matchDispatch }}>
      {children}
    </Context.Provider>
  );
};

export default Provider;
