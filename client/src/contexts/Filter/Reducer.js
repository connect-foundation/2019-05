const filterActions = {
  EVERY_CLICKED_AREA: 'EVERY_CLICKED_AREA',
  ADD_CLICKED_AREA: 'ADD_CLICKED_AREA',
  REMOVE_CLICKED_AREA: 'REMOVE_CLICKED_AREA',
  SET_MATCH_DAY: 'SET_MATCH_DAY',
  SET_START_TIME: 'SET_START_TIME',
  SET_END_TIME: 'SET_END_TIME',
  INITIALIZE_STATE: 'INITIALIZE_STATE',
};
const filterReducer = (state, action) => {
  /* eslint indent: ["error", 2, { "SwitchCase": 1 }] */
  switch (action.type) {
    case filterActions.EVERY_CLICKED_AREA:
      return { ...state, clickedArea: [] };
    case filterActions.ADD_CLICKED_AREA:
      return {
        ...state,
        clickedArea: [...state.clickedArea, action.payload],
      };
    case filterActions.REMOVE_CLICKED_AREA:
      return {
        ...state,
        clickedArea: [...state.clickedArea].filter((area) => area !== action.payload),
      };
    case filterActions.SET_MATCH_DAY:
      return { ...state, matchDay: action.payload };
    case filterActions.SET_START_TIME:
      return { ...state, startTime: action.payload };
    case filterActions.SET_END_TIME:
      return { ...state, endTime: action.payload };
    default:
      throw new Error('Unhandled action!');
  }
};
export { filterActions, filterReducer };