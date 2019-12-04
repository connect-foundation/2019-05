const toggleViewMatchRegistModal = (state, isView) => {
  return {
    ...state,
    isViewRegistModal: !isView,
  };
};

const matchReducer = (state, action) => {
  /* eslint indent: ["error", 2, { "SwitchCase": 1 }] */
  switch (action.type) {
    case 'TOGGLE_VIEW_MATCH_REGIST_MODAL':
      return toggleViewMatchRegistModal(state, action.isViewRegistModal);
    default:
      throw new Error('Unhandled action!');
  }
};

export default matchReducer;
