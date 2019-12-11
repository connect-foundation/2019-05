const playerActions = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
};

const playerReducer = (state, action) => {
  /* eslint indent: ["error", 2, { "SwitchCase": 1 }] */
  switch (action.type) {
    case playerActions.LOGIN:
      return { ...state, playerId: action.payload };
    case playerActions.LOGOUT:
      return { ...state, playerId: null };
    default:
      throw new Error('Unhandled action!');
  }
};

export { playerActions, playerReducer };
