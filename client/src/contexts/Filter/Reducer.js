import actions from './Actions';
import initialState from './InitialState';

const Reducer = (state, action) => {
  /* eslint indent: ["error", 2, { "SwitchCase": 1 }] */
  switch (action.type) {
    case actions.SET_MATCH_DAY:
      return { ...state, matchDay: action.payload };
    case actions.SET_START_TIME:
      return { ...state, startTime: action.payload };
    case actions.SET_END_TIME:
      return { ...state, endTime: action.payload };
    case actions.SET_SIMILER_RANK:
      return { ...state, isSimilerRank: !state.isSimilerRank };
    case actions.INITIALIZE_STATE:
      return { ...initialState };
    default:
      throw new Error('Unhandled action!');
  }
};

export default Reducer;
