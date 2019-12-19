import actions from './Actions';

const Reducer = (state, action) => {
  /* eslint indent: ["error", 2, { "SwitchCase": 1 }] */
  switch (action.type) {
    case actions.LOGIN:
      return {
        ...state,
        playerInfo: action.payload.playerInfo,
        subscription: action.payload.subscription,
      };
    case actions.LOGOUT:
      return { ...state, playerInfo: null, subscription: null };
    case actions.SET_IS_UPDATE_TEAM_CODE:
      return { ...state, isUpdateTeamCode: true };
    case actions.SET_IS_UPDATE_USER_INFO:
      return { ...state, isUpdateUserInfo: true };
    case actions.UPDATE_PLAYER_INFO:
      return { ...state, playerInfo: action.payload };
    default:
      throw new Error('Unhandled action!');
  }
};

export default Reducer;
