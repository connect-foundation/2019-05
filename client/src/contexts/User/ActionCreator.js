import actions from './Actions';

const actionCreator = {
  login: (playerInfo, subscription) => {
    return {
      type: actions.LOGIN,
      payload: { playerInfo, subscription },
    };
  },
  logout: () => {
    return { type: actions.LOGOUT };
  },
};

export default actionCreator;
