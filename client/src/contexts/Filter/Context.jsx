import React, { createContext, useState } from 'react';
import moment from 'moment';

const FilterContext = createContext({});

const FilterProvider = ({ children }) => {
  const initialState = {
    matchDay: moment(),
    startTime: '10:00',
    endTime: '12:00',
    isSimilerRank: false,
  };
  const [state, setState] = useState(initialState);

  return (
    <FilterContext.Provider value={[state, setState]}>
      {children}
    </FilterContext.Provider>
  );
};

export { FilterContext, FilterProvider };
