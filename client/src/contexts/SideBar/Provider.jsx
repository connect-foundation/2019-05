import React, { useReducer } from 'react';
import Reducer from './Reducer';
import initialState from './InitialState';
import Context from './Context';

const Provider = ({ children }) => {
  const [sideBarState, sideBarDispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={{ sideBarState, sideBarDispatch }}>
      {children}
    </Context.Provider>
  );
};
export default Provider;
