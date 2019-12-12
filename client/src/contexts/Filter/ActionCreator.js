import actions from './Actions';

const actionCreator = {
  setMatchDay: (matchDay) => {
    return { type: actions.SET_MATCH_DAY, payload: matchDay };
  },
  setStartTime: (startTime) => {
    return { type: actions.SET_START_TIME, payload: startTime };
  },
  setEndTime: (endTime) => {
    return { type: actions.SET_END_TIME, payload: endTime };
  },
  setSimlerRank: () => {
    return { type: actions.SET_SIMILER_RANK };
  },
  initializeState: () => {
    return { type: actions.INITIALIZE_STATE };
  },
};

export default actionCreator;
