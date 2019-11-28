import React, { createContext, useState } from 'react';

const FilterContext = createContext({});

const FilterProvider = ({ children }) => {
  const initialState = {
    isCheckedSN: true,
    isCheckedSB: true,
    isCheckedDB: true,
    isCheckedDN: true,
    // matchDay: null,
    // startTime: null,
    // endTime: null,
  };
  const [state, setState] = useState(initialState);

  return (
    <FilterContext.Provider value={[state, setState]}>
      {children}
    </FilterContext.Provider>
  );
};

export { FilterContext, FilterProvider };
