import moment from 'moment';

const filterInitialState = {
  matchDay: moment(),
  startTime: '10:00',
  endTime: '12:00',
  isSimilerRank: false,
};

const filterReducer = (state, action) => {
  /* eslint indent: ["error", 2, { "SwitchCase": 1 }] */
  switch (action.type) {
    case 'SET_MATCH_DAY':
      return { ...state, matchDay: action.payload };
    case 'SET_START_TIME':
      return { ...state, startTime: action.payload };
    case 'SET_END_TIME':
      return { ...state, endTime: action.payload };
    case 'SET_SIMILER_RANK':
      return { ...state, isSimilerRank: !state.isSimilerRank };
    case 'INITIALIZE_STATE':
      return { ...filterInitialState };
    default:
      throw new Error('Unhandled action!');
  }
};

export default filterReducer;