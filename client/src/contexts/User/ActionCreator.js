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
  setIsUpdateTeamCode: () => {
    return { type: actions.SET_IS_UPDATE_TEAM_CODE };
  },
  setIsUpdateUserInfo: () => {
    return { type: actions.SET_IS_UPDATE_USER_INFO };
  },
  updatePlayerInfo: (newPlayerInfo) => {
    return { type: actions.UPDATE_PLAYER_INFO, payload: newPlayerInfo };
  },
};

export default actionCreator;
