const setFilterContext = {
  setCheckedSN: (setFilterState) => {
    setFilterState((prev) => ({
      ...prev,
      isCheckedSN: !prev.isCheckedSN,
    }));
  },
  setCheckedSB: (setFilterState) => {
    setFilterState((prev) => ({
      ...prev,
      isCheckedSB: !prev.isCheckedSB,
    }));
  },
  setCheckedDB: (setFilterState) => {
    setFilterState((prev) => ({
      ...prev,
      isCheckedDB: !prev.isCheckedDB,
    }));
  },
  setCheckedDN: (setFilterState) => {
    setFilterState((prev) => ({
      ...prev,
      isCheckedDN: !prev.isCheckedDN,
    }));
  },
  // choiceMatchDay: (setFilterState, payload) => {
  //   setFilterState((prev) => ({
  //     ...prev,
  //     ...payload,
  //   }));
  // },
};

export default setFilterContext;
