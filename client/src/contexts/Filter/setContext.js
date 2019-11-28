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
  setMatchDay: (setFilterState, payload) => {
    setFilterState((prev) => ({
      ...prev,
      ...payload,
    }));
  },
  setSimilerRank: (setFilterState) => {
    setFilterState((prev) => ({
      ...prev,
      isSimilerRank: !prev.isSimilerRank,
    }));
  },
};

export default setFilterContext;
