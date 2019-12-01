import moment from 'moment';

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
  initializeState: (setFilterState) => {
    setFilterState({
      isCheckedSN: true,
      isCheckedSB: true,
      isCheckedDB: true,
      isCheckedDN: true,
      matchDay: moment(),
      startTime: null,
      endTime: null,
      isSimilerRank: false,
    });
  },
};

export default setFilterContext;
