import moment from 'moment';

const setFilterContext = {
  setMatchDay: (setFilterState, payload) => {
    setFilterState((prev) => ({
      ...prev,
      ...payload,
    }));
  },
  setStartTime: (setFilterState, payload) => {
    setFilterState((prev) => ({
      ...prev,
      ...payload,
    }));
  },
  setEndTime: (setFilterState, payload) => {
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
      matchDay: moment(),
      startTime: '10:00',
      endTime: '12:00',
      isSimilerRank: false,
    });
  },
};

export default setFilterContext;
