import actions from './Actions';

const actionCreator = {
  toggleActivated: () => {
    return { type: actions.TOGGLE_ACTIVATED };
  },
};

export default actionCreator;
