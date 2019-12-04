import React, { createContext, useReducer } from 'react';
import moment from 'moment';
import filterReducer from './Reducer';

const filterInitialState = {
  matchDay: moment(),
  startTime: '10:00',
  endTime: '12:00',
  isSimilerRank: false,
};

const FilterContext = createContext(filterInitialState);

const FilterProvider = ({ children }) => {
  const [filterState, dispatch] = useReducer(filterReducer, filterInitialState);

  return (
    <FilterContext.Provider value={{ filterState, dispatch }}>
      {children}
    </FilterContext.Provider>
  );
};

export { filterInitialState, FilterContext, FilterProvider };
