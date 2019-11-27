const setFilterContext = {
  changeCheckedSN: (setFilterState) => {
    setFilterState((prev) => ({
      ...prev,
      isCheckedSN: !prev.isCheckedSN,
    }));
  },
  changeCheckedSB: (setFilterState) => {
    setFilterState((prev) => ({
      ...prev,
      isCheckedSB: !prev.isCheckedSB,
    }));
  },
  changeCheckedDB: (setFilterState) => {
    setFilterState((prev) => ({
      ...prev,
      isCheckedDB: !prev.isCheckedDB,
    }));
  },
  changeCheckedDN: (setFilterState) => {
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
