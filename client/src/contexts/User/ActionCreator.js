import actions from './Actions';

const actionCreator = {
  login: (playerId, playerTeam) => {
    return { type: actions.LOGIN, payload: { playerId, playerTeam } };
  },
  logout: () => {
    return { type: actions.LOGOUT };
  },
};

export default actionCreator;
