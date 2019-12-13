import React, { useReducer } from 'react';
import Reducer from './Reducer';
import initialState from './InitialState';
import Context from './Context';

const Provider = ({ children }) => {
  const [filterState, filterDispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={{ filterState, filterDispatch }}>
      {children}
    </Context.Provider>
  );
};

export default Provider;
