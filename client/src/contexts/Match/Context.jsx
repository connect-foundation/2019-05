import React, { createContext, useReducer } from 'react';
import matchReducer from './Reducer';
import { getDistrict } from '../../util';

const initialState = {
  isViewRegistModal: false,
  districtInfo: getDistrict(),
};

const MatchContext = createContext(null);

const MatchProvider = ({ children }) => {
  const [matchState, dispatch] = useReducer(matchReducer, initialState);
  return (
    <MatchContext.Provider value={{ matchState, dispatch }}>
      {children}
    </MatchContext.Provider>
  );
};

export { MatchContext, MatchProvider };
