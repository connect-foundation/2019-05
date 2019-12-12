import actions from './Actions';

const Reducer = (state, action) => {
  /* eslint indent: ["error", 2, { "SwitchCase": 1 }] */
  switch (action.type) {
    case actions.TOGGLE_ACTIVATED:
      return {
        ...state,
        activated: !state.activated,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export default Reducer;
