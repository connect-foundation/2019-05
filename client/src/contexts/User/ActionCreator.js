import actions from './Actions';

const actionCreator = {
  login: (playerId, playerTeam, subscription) => {
    return {
      type: actions.LOGIN,
      payload: { playerId, playerTeam, subscription },
    };
  },
  logout: () => {
    return { type: actions.LOGOUT };
  },
};

export default actionCreator;
