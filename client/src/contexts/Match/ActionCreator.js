import actions from './Actions';

const actionCreator = {
  toggleViewMatchRegistModal: () => {
    return { type: actions.TOGGLE_VIEW_MATCH_REGIST_MODAL };
  },
  clickDistrict: (clickedDName) => {
    return {
      type: actions.CLICK_DISTRICT,
      payload: { clickedDName },
    };
  },
};

export default actionCreator;
