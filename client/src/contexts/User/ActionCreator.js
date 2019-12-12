import actions from './Actions';

const actionCreator = {
  login: (playerId) => {
    return { type: actions.LOGIN, payload: playerId };
  },
  logout: () => {
    return { type: actions.LOGOUT };
  },
};

export default actionCreator;
